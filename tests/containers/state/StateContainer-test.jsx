/**
 * StateContainer-test.jsx
 * Created by Lizzie Salita 5/7/18
 */

import React from 'react';
import { shallow, mount } from 'enzyme';

// mock the state helper
jest.mock('helpers/stateHelper', () => require('./mockStateHelper'));

import { StateContainer } from 'containers/state/StateContainer';
import { mockActions, mockRedux, mockStateOverview } from './mockData';
import BaseStateProfile from "../../../src/js/models/v2/state/BaseStateProfile";

// mock the child component by replacing it with a function that returns a null element
jest.mock('components/state/StatePage', () => jest.fn(() => null));

describe('StateContainer', () => {
    it('should make an API call for the selected state on mount', async () => {
        const container = mount(<StateContainer
            {...mockRedux}
            {...mockActions} />);

        const loadStateOverview = jest.fn();
        container.instance().loadStateOverview = loadStateOverview;

        container.instance().componentDidMount();
        await container.instance().request.promise;

        expect(loadStateOverview).toHaveBeenCalledTimes(1);
        expect(loadStateOverview).toHaveBeenCalledWith('1', 'latest');
    });
    it('should make an API call when the state id changes', async () => {
        const container = mount(<StateContainer
            {...mockRedux}
            {...mockActions} />);

        const loadStateOverview = jest.fn();
        container.instance().loadStateOverview = loadStateOverview;

        container.setProps({
            params: {
                stateId: '2'
            }
        });

        await container.instance().request.promise;

        expect(loadStateOverview).toHaveBeenCalledTimes(1);
        expect(loadStateOverview).toHaveBeenCalledWith('2', 'latest');
    });
    it('should reset the fiscal year when the state id changes', async () => {
        // Use 'all' for the initial FY
        const stateProfile = Object.assign({}, mockRedux.stateProfile, {
            fy: 'all'
        });
        const updatedRedux = Object.assign({}, mockRedux, {
            stateProfile
        });

        const container = mount(<StateContainer
            {...updatedRedux}
            {...mockActions} />);

        const loadStateOverview = jest.fn();
        container.instance().loadStateOverview = loadStateOverview;

        container.setProps({
            params: {
                stateId: '2'
            }
        });

        await container.instance().request.promise;

        expect(loadStateOverview).toHaveBeenCalledTimes(1);
        expect(loadStateOverview).toHaveBeenCalledWith('2', 'latest');


    });
    it('should make an API call when the fiscal year changes', async () => {
        const container = mount(<StateContainer
            {...mockRedux}
            {...mockActions} />);

        const loadStateOverview = jest.fn();
        container.instance().loadStateOverview = loadStateOverview;

        const stateProfile = Object.assign({}, mockRedux.stateProfile, {
            fy: '2018'
        });

        const nextProps = Object.assign({}, mockRedux, {
            stateProfile
        });

        container.setProps(nextProps);

        await container.instance().request.promise;

        expect(loadStateOverview).toHaveBeenCalledTimes(1);
        expect(loadStateOverview).toHaveBeenCalledWith('1', '2018');
    });
    describe('parseOverview', () => {
        it('should update the Redux state with a new BaseStateProfile', () => {
            const container = shallow(<StateContainer
                {...mockRedux}
                {...mockActions} />);

            // Reset the mock action's call count
            mockActions.setStateOverview.mockReset();

            container.instance().parseOverview(mockStateOverview.results);

            const expectedParam = Object.create(BaseStateProfile);
            expectedParam.populate(mockStateOverview.results);

            expect(mockActions.setStateOverview).toHaveBeenCalledTimes(1);
            expect(mockActions.setStateOverview).toHaveBeenCalledWith(expectedParam);
        });
    });
});