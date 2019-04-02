/**
 * NormalChart.jsx
 * Created by David Trinh 2/15/19
 **/

import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    awardAmounts: PropTypes.object
};

export default class NormalChart extends React.Component {
    render() {
        const awardAmounts = this.props.awardAmounts;

        const obligatedStyle = {
            width: `${awardAmounts.obligatedPercentage}%`,
            backgroundColor: '#4773aa'
        };

        const currentStyle = {
            width: `${awardAmounts.currentPercentage}%`,
            backgroundColor: '#d8d8d8'
        };

        const obligatedLabelStyle = {
            width: `${awardAmounts.obligatedPercentage}%`
        };

        const currentLabelStyle = {
            width: `${awardAmounts.currentLabelPercentage}%`
        };

        return (
            <div className="award-amounts-viz">
                <div className="award-amounts-viz__desc-top">
                    <strong>{awardAmounts.obligationFormatted}</strong><br />Combined Obligated Amounts
                </div>
                <div className="award-amounts-viz__label" style={obligatedLabelStyle}>
                    <div className="award-amounts-viz__line-up" />
                </div>
                <div className="award-amounts-viz__bar-wrapper">
                    <div className="award-amounts-viz__bar">
                        <div className="award-amounts-viz__obligated" style={obligatedStyle} />
                        <div className="award-amounts-viz__excerised" style={currentStyle} />
                    </div>
                </div>
                <div className="award-amounts-viz__label" style={currentLabelStyle}>
                    <div className="award-amounts-viz__line" />
                    <div className="award-amounts-viz__desc">
                        <div className="award-amounts-viz__desc-text">
                            <strong>{awardAmounts.combinedCurrentAwardAmountsFormatted}</strong><br />Combined Current Award Amounts
                        </div>
                        <div className="award-amounts-viz__legend-line" />
                    </div>
                </div>
                <div className="award-amounts-viz__label">
                    <div className="award-amounts-viz__line" />
                    <div className="award-amounts-viz__desc">
                        <div className="award-amounts-viz__desc-text">
                            <strong>{awardAmounts.combinedPotentialAwardAmountsFormatted}</strong><br />Combined Potential Award Amounts
                        </div>
                        <div className="award-amounts-viz__legend-line award-amounts-viz__legend-line_potential" />
                    </div>
                </div>
            </div>
        );
    }
}
NormalChart.propTypes = propTypes;
