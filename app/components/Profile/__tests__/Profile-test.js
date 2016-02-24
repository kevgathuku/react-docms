'use strict';

import React from 'react';
import expect from 'expect';
import sinon from 'sinon';
import { mount, shallow } from 'enzyme';
import Profile from '../index.jsx';

describe('Profile', function() {

  describe('Component Rendering', function() {
    before(function() {
      let user = {
        name: {
          first: 'Khaled',
          last: 'Another One'
        },
        role: {
          title: 'viewer'
        },
        email: 'khaled@anotherone.com'
      };
      var storage = sinon.stub(localStorage, 'getItem');
      storage.withArgs('userInfo').returns(JSON.stringify(user));
    });

    it('renders the profile component by default', function() {
      expect(shallow(<Profile />).is('.container')).toEqual(true);
      expect(shallow(<Profile />).text()).toMatch(/My\s+Profile/);
    });

    it('calls componentDidMount', () => {
      sinon.spy(Profile.prototype, 'componentDidMount');
      mount(<Profile />); // Mount the component
      expect(Profile.prototype.componentDidMount.called).toBe(true);
      Profile.prototype.componentDidMount.restore();
    });

    it('calls componentWillUnmount', () => {
      sinon.spy(Profile.prototype, 'componentWillUnmount');
      let profile = mount(<Profile />); // Mount the component
      profile.unmount();
      expect(Profile.prototype.componentWillUnmount.calledOnce).toBe(true);
      Profile.prototype.componentWillUnmount.restore();
    });

    it('has the correct initial state', function() {
      const profile = shallow(<Profile />);
      expect(localStorage.getItem.withArgs('userInfo').called).toBe(true);
      expect(profile.state().profileDisplay).toEqual('block');
      expect(profile.state().editDisplay).toEqual('none');
      expect(profile.state().password).toEqual(null);
    });

  });
});
