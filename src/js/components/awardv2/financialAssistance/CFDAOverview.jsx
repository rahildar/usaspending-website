import React from 'react';

import AwardSection from '../shared/AwardSection';
import AwardSectionHeader from '../shared/AwardSectionHeader';
import { CFDAOverviewInfo } from '../shared/InfoTooltipContent';

const CFDAOverview = ({
    cfdaNumber = "--",
    cfdaTitle = "--"
}) => {
    return (
        <AwardSection type="column">
            <AwardSectionHeader
                title="CFDA Program / Assistance Listing"
                tooltip={CFDAOverviewInfo} />
            <div className="award-overview__body award-overview__cfda">
                <span>
                    {(!cfdaNumber && !cfdaTitle)
                        ? '--'
                        : `${cfdaNumber} - ${cfdaTitle}`}
                </span>
            </div>
        </AwardSection>
    );
};

export default CFDAOverview;