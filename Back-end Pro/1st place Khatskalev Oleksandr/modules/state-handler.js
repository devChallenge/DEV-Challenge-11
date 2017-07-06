const uuidv4 = require('uuid/v4');

/**
 * The job of this module is to handle current state of the app
 * As a secondary, but nor primary, saving state changes to db, 
 * just in case of app crash or restart, so state can be restored.
 * But primary module objective is to act as fast as possible.
 */
module.exports = function(callModel, employeeModel, queue, finder) {
  const state = {
    employees: [],
    calls: []
  };

  // Try to load employees from db on init
  queue.push(async function() {
    employeeModel(async function(Employee) {
      const employees = await Employee.find();
      if (employees.length) {
        state.employees = employees;
      }
    });
  });

  // Try to load calls from db on init
  queue.push(async function() {
    callModel(async function(Call) {
      const calls = await Call.find();
      if (calls.length) {
        state.calls = calls;
      }
    });
  });

  // Add employee to waiting queue
  function registerEmployee(name, areas) {
    const employee = { name, areas, isBusy: false };
    state.employees.push(employee);
    console.log(`Registered employee: ${name}`);

    const call = state.calls.find(call => !call.employee && areas.indexOf(call.area) !== -1);
    if (call) {
      call.employee = name;

      // Try to assign a call right away
      queue.push(async function() {
        await callModel(async function(Call) {
          const callInDb = await Call.findOne({ uuid: call.uuid });
          callInDb.employee = name;
          await callInDb.save();
        });
      });

      // If no fitting calls - add to waiting queue
      queue.push(async function() {
        await employeeModel(async function(Employee) {
          await Employee.update({name}, { $set: { areas, isBusy: true } }, { upsert: true });
        });
      });

      employee.isBusy = true;

    } else {
      // If no fitting calls - add to waiting queue
      queue.push(async function() {
        await employeeModel(async function(Employee) {
          await Employee.update({name}, { $set: { areas, isBusy: false } }, { upsert: true });
        });
      });
    }
  }

  // Public function takes array of calls to register
  function registerCalls(areas) {
    const result = finder(areas, state.employees);
    result.forEach(_registerCall);

    return result.map(el => {
      return {
        area: el.area,
        employee: el.employee && el.employee.name || ''
      };
    });
  }

  // Private function to register each call
  function _registerCall(obj) {
    const employee = obj.employee;
    let call;

    if (employee) {
      employee.isBusy = true;
      call = { area: obj.area, employee: employee.name, uuid: uuidv4() };

      // Remove employee from waiting queue
      queue.push(async function() {
        await employeeModel(async function(Employee) {
          await Employee.update({ name: employee.name }, { $set: { isBusy: true } });
        });
      });

    } else {
      call = { area: obj.area, employee: '', uuid: uuidv4() };
    }

    // save current call state to db
    queue.push(async function() {
      await callModel(async function(Call) {
        const callInDb = new Call(call);
        await callInDb.save();
      });
    });

    state.calls.push(call);
    return call;
  }

  // inform about finished call
  function finishedCall(name) {
    const call = state.calls.find(el => el.employee === name);
    if (!call) return null;
    
    const index = state.calls.indexOf(call);
    state.calls.splice(index, 1);

    queue.push(async function() {
      await callModel(async function(Call) {
        await Call.remove({ uuid: call.uuid });
      });
    });

    const employee = state.employees.find(el => el.name === name);
    employee.isBusy = false;

    // Remove employee from waiting queue
    queue.push(async function() {
      await employeeModel(async function(Employee) {
        await Employee.update({ name }, { $set: { isBusy: false } });
      });
    });
  }

  // reset all state in both db and state-handler
  function reset() {
    state.employees = [];
    state.calls = [];

    queue.push(async function() {
      await callModel(async function(Call) {
        await Call.remove({});
      });
    });

    queue.push(async function() {
      await employeeModel(async function(Employee) {
        await Employee.remove({});
      });
    });
  }

  return { registerEmployee, registerCalls, finishedCall, reset };
};
