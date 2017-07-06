module.exports = function() {
  return function(areas, employees) {
    const freeEmployees = employees
      .filter(employee => {
        const isFree = !employee.isBusy;
        const isSpecialistInArea = employee.areas.some(area => areas.indexOf(area) !== -1);
        return isFree && isSpecialistInArea;
      });

    const areasOverall = {};
    areas.forEach(area => {
      areasOverall[area] = 0;
    });

    freeEmployees.forEach(employee => {
      employee.areas.forEach(area => {
        if (areas.indexOf(area) !== -1) {
          areasOverall[area]++;
        }
      });
    });

    const result = [];
    const employeesCopy = JSON.parse(JSON.stringify(employees));

    const sorted = Object.keys(areasOverall)
      .map(key => {
        return {
          area: key,
          occurences: areasOverall[key]
        };
      })
      .sort((a,b) => a.occurences - b.occurences);

    sorted.forEach(el => {
      const employee = employeesCopy.find(empel => empel.areas.indexOf(el.area) !== -1);
      if (employee) {
        const index = employeesCopy.indexOf(employee);
        employeesCopy.splice(index, 1);
      }
      const realEmployee = employees.find(empel => empel.areas.indexOf(el.area) !== -1);
      result.push({
        area: el.area,
        employee: realEmployee || null
      });
    });

    return result;
  };
};