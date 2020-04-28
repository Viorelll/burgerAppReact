import React from 'react';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import NavitaionItems from './NavigationItems';
import NavitaionItem from './NavigationItem/NavigationItem';

configure({adapter: new Adapter()});

describe('<NavitaionItems />', () => {
    let wrapper = shallow(<NavitaionItems/>);
    beforeEach(() => {

    });

    it('should render two <NavitationItems/> elements if not authenticated', () => {
        expect(wrapper.find(NavitaionItem)).toHaveLength(2);
    });

    it('should render tree <NavitationItems/> elements if authenticated', () => {
        //wrapper = shallow(<NavitaionItems isAuthenticated/>);
        wrapper.setProps({isAuthenticated: true});
        expect(wrapper.find(NavitaionItem)).toHaveLength(3);
    });

    it('should render tree <NavitationItems/> elements if authenticated which include "Logout"', () => {
        wrapper.setProps({isAuthenticated: true});
        expect(wrapper.contains(<NavitaionItem link='/logout'>Logout</NavitaionItem>)).toEqual(true);
    });
});
