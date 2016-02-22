'use strict';

import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import Main from '../Main.jsx';

describe('Main component', function() {

  it('renders the children components', function() {
    // It renders the provided child components
    const component = shallow(<Main children={<div>'Child Component'</div>}/>);
    expect(component.contains(<div>'Child Component'</div>)).to.equal(true);
  });

});
