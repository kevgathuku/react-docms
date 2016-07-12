'use strict';

import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';
import expectJSX from 'expect-jsx';
import Main from '../Main.jsx';
import NavBar from '../../NavBar/index.jsx';
expect.extend(expectJSX);

describe('Main component', function() {

  it('renders the children components', function() {
    // It renders the provided child components
    const component = shallow(<Main children={<div>'Child Component'</div>} location={{pathname : '/'}}/>);
    expect(component.contains(<div>'Child Component'</div>)).toEqual(true);
  });

  it('renders the NavBar component', function() {
    // It renders the NavBar component and the provided child components
    const component = shallow(<Main children={<div>'Child Component'</div>} location={{pathname : '/'}}/>);
    expect(component.contains(<NavBar pathname={'/'}/>)).toEqual(true);
    expect(component.contains(<div>'Child Component'</div>)).toEqual(true);
  });

});
