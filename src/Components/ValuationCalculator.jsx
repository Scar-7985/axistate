import React, { useState } from 'react'

const ValuationCalculator = () => {

const [purchasePrice, setPurchasedPrice] = useState(null);
const [netOperIncome, setNetOperIncome] = useState(null);
const [downPayment, setDownPayment] = useState(null);
const [interestRate, setInterestRate] = useState(null);
const [terms, setTerms] = useState(null);

const CalculateValuation = () => {
    
}

    return (
        <div className="single-property-element single-property-loan">
            <h6 className="title fw-6">Valuation Calculator</h6>
            <form className="box-loan-calc">
                <div className="box-top">
                    <div className='row'>
                        <div className="item-calc col-6">
                            <label htmlFor="loan1" className="label">Purchased Price <span className='text-danger'>*</span></label>
                            <input type="number" id="loan1" placeholder="10,000" className="form-control" />
                        </div>
                        <div className="item-calc col-6">
                            <label htmlFor="loan2" className="label">Net Operating Income <span className='text-danger'>*</span></label>
                            <input type="number" id="loan2" placeholder="3000" className="form-control" />
                        </div>
                    </div>
                    <div className="item-calc">
                        <label htmlFor="loan3" className="label">Down Payment</label>
                        <input type="number" id="loan3" placeholder="12" className="form-control" />
                    </div>
                    <div className='row'>
                        <div className="item-calc col-6">
                            <label htmlFor="loan1" className="label">Interest Rate <span className='text-danger'>*</span></label>
                            <input type="number" id="loan1" placeholder="10,000" className="form-control" />
                        </div>
                        <div className="item-calc col-6">
                            <label htmlFor="loan2" className="label">Term (Years) <span className='text-danger'>*</span></label>
                            <input type="number" id="loan2" placeholder="3000" className="form-control" />
                        </div>
                    </div>

                </div>
                <div className="box-bottom">
                 <div className="d-flex flex-column">
                        <div>
                            <span className="text-btn">Annual Debt Service: </span>
                            <span className="text-btn text-primary">$599.25</span>
                        </div>
                        <div>
                            <span className="text-btn">Loan Amount: </span>
                            <span className="text-btn text-primary">$599.25</span>
                        </div>
                        <div>
                            <span className="text-btn">Annual Cash Flow: </span>
                            <span className="text-btn text-primary">$599.25</span>
                        </div>
                    </div>
                    <button className="tf-btn primary">Calculate</button>
                </div>
            </form>
        </div>
    )
}

export default ValuationCalculator
