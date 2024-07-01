import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';

const Budget = () => {
    const { budget, expenses, currency } = useContext(AppContext);
    const totalSpent = expenses.reduce((total, item) => {
        return total + item.cost;
    }, 0);
    const [newBudget, setNewBudget] = useState(budget);
    const [error, setError] = useState('');

    const handleBudgetChange = (event) => {
        const value = parseInt(event.target.value, 10);
        if (isNaN(value) || value <= 0) {
            setNewBudget('');
            setError('Please enter a valid budget.');
            return;
        }

        setNewBudget(value);
        if (value > 20000) {
            setError('Budget cannot exceed 20,000');
        } else if (value < totalSpent) {
            setError(`Budget cannot be lower than the total spending of ${currency}${totalSpent}`);
        } else {
            setError('');
        }
    };

    return (
        <div className='alert alert-secondary'>
            <span>Budget: {currency}{budget}</span>
            <div className="input-group">
                <div className="input-group-prepend">
                    <span className="input-group-text">{currency}</span>
                </div>
                <input
                    type="number"
                    step="10"
                    value={newBudget}
                    onChange={handleBudgetChange}
                    className="form-control"
                />
            </div>
            {error && <div className="text-danger">{error}</div>}
        </div>
    );
};

export default Budget;
