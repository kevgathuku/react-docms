'use strict';

import React from 'react';
import sinon from 'sinon';
import expect from 'expect';
import { mount, shallow } from 'enzyme';
import NavBar from '../index.jsx';
import UserActions from '../../../actions/UserActions';
import UserStore from '../../../stores/UserStore';

describe('NavBar', function() {

  describe('Component Rendering', function() {
    it('renders the correct mobile links', function() {
      // It should find the correct title
      expect(shallow(<NavBar />).text()).toMatch(/Docue/);
      // It should render the correct menu items
      expect(shallow(<NavBar />).text()).toMatch(/Home/);
      expect(shallow(<NavBar />).text()).toMatch(/Sign Up/);
      expect(shallow(<NavBar />).text()).toMatch(/Login/);
    });

    it('renders the correct component', function() {
      expect(shallow(<NavBar />).is('.transparent')).toEqual(true);
      // It should render the site logo
      expect(shallow(<NavBar />).find('img').length).toEqual(1);
    });

    it('has the correct initial state', function() {
      const navBar = shallow(<NavBar />);
      expect(navBar.state().token).toEqual(null);
      expect(navBar.state().loggedIn).toEqual(null);
      expect(navBar.state().user).toEqual(null);
    });

    it('calls componentDidMount', () => {
      sinon.spy(NavBar.prototype, 'componentDidMount');
      mount(<NavBar />); // Mount the component
      expect(NavBar.prototype.componentDidMount.calledOnce).toBe(true);
      NavBar.prototype.componentDidMount.restore();
    });

    it('calls registered callbacks on mount', () => {
      sinon.spy(UserActions, 'getSession');
      sinon.spy(UserStore, 'addChangeListener');
      mount(<NavBar />); // Mount the component
      expect(UserActions.getSession.calledOnce).toBe(true);
      expect(UserStore.addChangeListener.callCount).toBe(4);
      UserStore.addChangeListener.restore();
      UserActions.getSession.restore();
    });

  });

  describe('Class functions', function() {

    describe('userSession', function() {
      it('calls the user session change listener', () => {
        sinon.spy(UserStore, 'getSession');
        mount(<NavBar />); // Mount the component
        // Trigger a change in the UserStore
        UserStore.setSession({});
        // The getSession function should be called
        expect(UserStore.getSession.called).toBe(true);
        UserStore.getSession.restore();
      });

      it('sets the correct state if the response is valid', function() {
        let navBar = mount(<NavBar />);
        // Trigger a change in the UserStore
        UserStore.setSession({
          loggedIn: 'true',
          user: {
            name: 'Kevin',
            role: {
              title: 'viewer'
            }
          }
        });
        expect(UserStore.getSession()).toBeA('object');
        expect(navBar.state().loggedIn).toEqual('true');
        expect(navBar.state().user).toBeA('object');
      });
    });
  });

});
