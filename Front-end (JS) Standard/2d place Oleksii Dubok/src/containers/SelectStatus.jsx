import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Select from '../components/ui-components/Select.jsx';
import SelectItem from '../components/ui-components/SelectItem.jsx';

class SelectStatus extends PureComponent {
    static propTypes = {
        statuses      : PropTypes.array.isRequired,
        onStatusSelect: PropTypes.func.isRequired,
        selected      : PropTypes.string.isRequired
    };

    state = {
        countryColor: 0
    }

    handleSelect = (id) => {
        this.props.onStatusSelect('status', id);
    };

    render() {
        const { selected, statuses } = this.props;
        const currentStatus = statuses.find(item => item.name === selected);

        return (
            <Select
                name='status'
                label='Status'
                selected={currentStatus.name}
                maxHeight={120}
                style={{ width: '100%' }}
            >
                {
                    statuses.map((item) =>
                        <SelectItem
                            key={item.id}
                            active={item.id === selected}
                            text={item.name}
                            onSelect={this.handleSelect.bind(this, item.name)}
                        />)
                }
            </Select>
        );
    }
}

const mapStateToProps = (state) => ({
    statuses: state.columns
});


export default connect(mapStateToProps)(SelectStatus);
