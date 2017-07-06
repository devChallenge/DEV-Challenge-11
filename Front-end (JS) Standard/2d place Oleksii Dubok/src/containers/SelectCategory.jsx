import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Select from '../components/ui-components/Select.jsx';
import SelectItem from '../components/ui-components/SelectItem.jsx';

class SelectCategory extends PureComponent {
    static propTypes = {
        categories      : PropTypes.array.isRequired,
        onCategorySelect: PropTypes.func.isRequired,
        selected        : PropTypes.string.isRequired
    };

    state = {
        countryColor: 0
    }

    handleSelect = (item) => {
        this.props.onCategorySelect('category', item.id);
        this.props.onCategorySelect('color', item.color);
    };

    render() {
        const { selected, categories } = this.props;
        const currentCategory = categories.find(item => item.id === selected);

        return (
            <Select
                name='category'
                label='Category'
                color={currentCategory.color}
                selected={currentCategory.name}
                maxHeight={120}
                style={{ width: '100%' }}
            >
                {
                    categories.map((item) =>
                        <SelectItem
                            key={item.id}
                            active={item.id === selected}
                            text={item.name}
                            color={item.color}
                            onSelect={this.handleSelect.bind(this, item)}
                        />)
                }
            </Select>
        );
    }
}

const mapStateToProps = (state) => ({
    categories: state.categories
});


export default connect(mapStateToProps)(SelectCategory);
