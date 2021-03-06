import React from 'react';
import { shallow, render } from 'enzyme';
import {expect} from 'chai';

import VariableEditor from '/react/src/js/components/VariableEditor';


describe('<VariableEditor />', function () {
    const rjvId = 1;

    it('VariableEditor click-to-edit should be visible', function () {
        const wrapper = shallow(
            <VariableEditor
            src={{test:true}}
            theme='rjv-default'
            onEdit={(edit)=>{}}
            rjvId={rjvId}
            singleIndent={1}
            variable={{
                name: 'test',
                value: 5,
                type: 'int'
            }}
            />
        );
        wrapper.instance().setHover(true);
        expect(
            wrapper.find('.click-to-edit').props().style.display
        ).to.equal('inline-block');
        expect(
            wrapper.state('hover')
        ).to.equal(true);
    });

    it('VariableEditor click-to-edit should be hidden', function () {
        const wrapper = shallow(
            <VariableEditor
            src={{test:true}}
            theme='rjv-default'
            onEdit={false}
            rjvId={rjvId}
            variable={{
                name: 'test',
                value: 5,
                type: 'int'
            }}
            />
        );
        wrapper.instance().setHover(true);
        expect(
            wrapper.find('.click-to-edit').props().style.display
        ).to.equal('none');
        expect(
            wrapper.state('hover')
        ).to.equal(true);
    });

    it('VariableEditor test textarea and cancel icon', function () {
        const wrapper = shallow(
            <VariableEditor
            src={{test:true}}
            theme='rjv-default'
            onEdit={(edit)=>{}}
            rjvId={rjvId}
            variable={{
                name: 'test',
                value: 5,
                type: 'int'
            }}
            />
        );
        wrapper.instance().setHover(true);
        expect(
            wrapper.find('.click-to-edit-icon').length
        ).to.equal(1);
        wrapper.find('.click-to-edit-icon').simulate('click');
        expect(
            wrapper.state('editMode')
        ).to.equal(true);
        expect(
            wrapper.find('.variable-editor').length
        ).to.equal(1);
        wrapper.find('.edit-cancel').simulate('click');
        expect(
            wrapper.find('.variable-editor').length
        ).to.equal(0);
    });

    it('VariableEditor test textarea and submit icon', function () {
        const wrapper = shallow(
            <VariableEditor
            src={{test:true}}
            theme='rjv-default'
            onEdit={(edit)=>{}}
            rjvId={rjvId}
            variable={{
                name: 'test',
                value: 5,
                type: 'int'
            }}
            />
        );
        wrapper.instance().setHover(true);
        expect(
            wrapper.find('.click-to-edit-icon').length
        ).to.equal(1);
        wrapper.find('.click-to-edit-icon').simulate('click');
        expect(
            wrapper.state('editMode')
        ).to.equal(true);
        expect(
            wrapper.find('.variable-editor').length
        ).to.equal(1);
        wrapper.find('.edit-check').simulate('click');
        expect(
            wrapper.find('.variable-editor').length
        ).to.equal(1);
    });

});