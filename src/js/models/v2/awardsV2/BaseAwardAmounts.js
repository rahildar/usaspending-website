/**
 * BaseAwardAmount.js
 * Created by David Trinh 12/19/18
 */

import * as MoneyFormatter from 'helpers/moneyFormatter';

const BaseAwardAmounts = {
    populateBase(data) {
        this.id = (data.award_id && `${data.award_id}`) || '';
        this.generatedId = data.generated_unique_award_id || '';
    },
    populateIdv(data) {
        this.childIDVCount = data.child_idv_count || 0;
        this.childAwardCount = data.child_award_count || 0;
        this.grandchildAwardCount = data.grandchild_award_count || 0;
        this._baseAndAllOptions = parseFloat(
            data.child_award_base_and_all_options_value + data.grandchild_award_base_and_all_options_value
        ) || 0;
        this._totalObligation = parseFloat(
            data.child_award_total_obligation + data.grandchild_award_total_obligation
        ) || 0;
        this._baseExercisedOptions = parseFloat(
            data.child_award_base_exercised_options_val + data.grandchild_award_base_exercised_options_val
        ) || 0;
    },
    populateGrant(data) {
        this._totalObligation = data.total_obligation;
        this._totalFunding = data.total_funding;
        this._nonFederalFunding = data.non_federal_funding;
    },
    populate(data, awardType) {
        this.populateBase(data);
        if (awardType === 'idv') {
            this.populateIdv(data);
        }
        else if (awardType === 'financial-assistance') {
            this.populateGrant(data);
        }
    },
    get baseAndAllOptionsFormatted() {
        return MoneyFormatter.formatMoneyWithPrecision(this._baseAndAllOptions, 2);
    },
    get baseAndAllOptionsAbbreviated() {
        if (this._baseAndAllOptions >= MoneyFormatter.unitValues.MILLION) {
            const units = MoneyFormatter.calculateUnitForSingleValue(this._baseAndAllOptions);
            return `${MoneyFormatter.formatMoneyWithPrecision(this._baseAndAllOptions / units.unit, 1)} ${units.unitLabel}`;
        }
        return MoneyFormatter.formatMoney(this._baseAndAllOptions);
    },
    get totalObligationFormatted() {
        return MoneyFormatter.formatMoneyWithPrecision(this._totalObligation, 2);
    },
    get totalObligationAbbreviated() {
        if (Math.abs(this._totalObligation) >= MoneyFormatter.unitValues.MILLION) {
            const units = MoneyFormatter.calculateUnitForSingleValue(this._totalObligation);
            if (this._totalObligation < 0) {
                return `(${MoneyFormatter.formatMoneyWithPrecision(Math.abs(this._totalObligation) / units.unit, 1)} ${units.unitLabel})`;
            }
            return `${MoneyFormatter.formatMoneyWithPrecision(this._totalObligation / units.unit, 1)} ${units.unitLabel}`;
        }
        else if (this._totalObligation < 0) {
            return `(${Math.abs(MoneyFormatter.formatMoney(this._totalObligation))})`;
        }
        return MoneyFormatter.formatMoney(this._totalObligation);
    },
    get baseExercisedOptionsFormatted() {
        return MoneyFormatter.formatMoneyWithPrecision(this._baseExercisedOptions, 2);
    },
    get baseExercisedOptionsAbbreviated() {
        if (this._baseExercisedOptions >= MoneyFormatter.unitValues.MILLION) {
            const units = MoneyFormatter.calculateUnitForSingleValue(this._baseExercisedOptions);
            return `${MoneyFormatter.formatMoneyWithPrecision(this._baseExercisedOptions / units.unit, 1)} ${units.unitLabel}`;
        }
        return MoneyFormatter.formatMoney(this._baseExercisedOptions);
    },
    get overspendingFormatted() {
        return MoneyFormatter.formatMoneyWithPrecision(this._totalObligation - this._baseExercisedOptions, 2);
    },
    get overspendingAbbreviated() {
        if (this._totalObligation - this._baseExercisedOptions >= MoneyFormatter.unitValues.MILLION) {
            const units = MoneyFormatter.calculateUnitForSingleValue(this._totalObligation - this._baseExercisedOptions);
            return `${MoneyFormatter.formatMoneyWithPrecision((this._totalObligation - this._baseExercisedOptions) / units.unit, 1)} ${units.unitLabel}`;
        }
        return MoneyFormatter.formatMoney(this._totalObligation - this._baseExercisedOptions);
    },
    get extremeOverspendingFormatted() {
        return MoneyFormatter.formatMoneyWithPrecision(this._totalObligation - this._baseAndAllOptions, 2);
    },
    get extremeOverspendingAbbreviated() {
        if (this._totalObligation - this._baseAndAllOptions >= MoneyFormatter.unitValues.MILLION) {
            const units = MoneyFormatter.calculateUnitForSingleValue(this._totalObligation - this._baseAndAllOptions);
            return `${MoneyFormatter.formatMoneyWithPrecision((this._totalObligation - this._baseAndAllOptions) / units.unit, 1)} ${units.unitLabel}`;
        }
        return MoneyFormatter.formatMoney(this._totalObligation - this._baseAndAllOptions);
    },
    get totalFundingAbbreviated() {
        if (this._totalFunding >= MoneyFormatter.unitValues.MILLION) {
            const units = MoneyFormatter.calculateUnitForSingleValue(this._totalFunding);
            return `${MoneyFormatter.formatMoneyWithPrecision((this._totalFunding) / units.unit, 1)} ${units.unitLabel}`;
        }
        return MoneyFormatter.formatMoney(this._totalFunding);
    },
    get totalFundingFormatted() {
        return MoneyFormatter.formatMoneyWithPrecision(this._totalFunding, 2);
    },
    get nonFederalFundingFormatted() {
        return MoneyFormatter.formatMoneyWithPrecision(this._nonFederalFunding, 2);
    },
    get nonFederalFundingAbbreviated() {
        if (this._nonFederalFunding >= MoneyFormatter.unitValues.MILLION) {
            const units = MoneyFormatter.calculateUnitForSingleValue(this._nonFederalFunding);
            return `${MoneyFormatter.formatMoneyWithPrecision((this._nonFederalFunding) / units.unit, 1)} ${units.unitLabel}`;
        }
        return MoneyFormatter.formatMoney(this._nonFederalFunding);
    }
};

export default BaseAwardAmounts;
