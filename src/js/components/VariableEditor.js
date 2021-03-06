import React from 'react';

import {toType} from './../helpers/util';
import dispatcher from './../helpers/dispatcher';

//data type components
import {
    JsonBoolean, JsonFloat, JsonFunction, JsonInteger,
    JsonNan, JsonNull, JsonObject, JsonString, JsonUndefined
} from './DataTypes/DataTypes';

//clibboard icon
import EditIcon from 'react-icons/lib/fa/edit';
import CheckCircle from 'react-icons/lib/md/check-circle';
import Cancel from 'react-icons/lib/md/cancel';
import ReactTooltip from 'react-tooltip';

//theme
import Theme from './../themes/getStyle';
import Radium from 'radium';

@Radium
class VariableEditor extends React.Component {

    state = {
        hover: false,
        editMode: false,
        editValue: ""
    }

    render() {
        const {
            variable, singleIndent, type, theme,
            namespace, indentWidth, onEdit
        } = this.props;
        const {hover, editMode} = this.state;

        return (
        <div {...Theme(
            theme, 'objectKeyVal', indentWidth * singleIndent
        )}
        onMouseEnter={()=>{this.setHover(true)}}
        onMouseLeave={()=>{this.setHover(false)}}
        key={variable.name}>
            {
                type == 'array'
                ? (
                <div {...Theme(theme, 'array-key')}
                key={variable.name + '_' + namespace}>
                    {variable.name}
                    <div {...Theme(theme, 'colon')}>:</div>
                </div>
                )
                : (
                <div {...Theme(theme, 'object-name')}
                key={variable.name + '_' + namespace}>
                    <span style={{verticalAlign:'top'}}>"</span>
                    <div style={{display:'inline-block'}} >
                        {variable.name}
                    </div>
                    <span style={{verticalAlign:'top'}}>"</span>
                    <div {...Theme(theme, 'colon')}>:</div>
                </div>
                )

            }
            <div {...Theme(theme, 'variable-value')}>
                {this.getValue(variable, this.props, editMode)}
            </div>
            {this.getEditIcons(hover)}
        </div>
        );

    }

    getEditIcons = (hover) => {
        const {variable, namespace, theme, onEdit} = this.props;
        const {editMode} = this.state;
        const tooltip_id = variable.name + '_' + namespace + '-tooltip';
        let display = 'inline-block';

        if (editMode || toType(onEdit) !== 'function') {
            display = 'none';
        }

        return (
        <div
        class="click-to-edit"
        style={{verticalAlign: 'top', display:display}}
        data-tip='edit this value'
        data-for={tooltip_id} >
            <ReactTooltip
            effect="solid"
            id={tooltip_id}
            place="right"
            delayShow={1000} />
            <EditIcon
            class="click-to-edit-icon"
            {...Theme(theme, 'editVarIcon', hover)}
            onClick={() => {
                this.state.editMode = true;
                this.setState(this.state);
            }}
            />
        </div>
        );

    }

    setHover = (hover) => {
        this.state.hover = hover;
        this.setState(this.state);
    }

    getValue = (variable, props, editMode) => {
        const type = editMode ? false : variable.type;
        switch (type) {
            case false:
                return this.getEditInput();
            case 'string':
                return <JsonString value={variable.value} {...props} />;
            case 'integer':
                return <JsonInteger value={variable.value} {...props} />;
            case 'float':
                return <JsonFloat value={variable.value} {...props} />;
            case 'boolean':
                return <JsonBoolean value={variable.value} {...props} />;
            case 'function':
                return <JsonFunction value={variable.value} {...props} />;
            case 'null':
                return <JsonNull {...props} />;
            case 'nan':
                return <JsonNan {...props} />;
            case 'undefined':
                return <JsonUndefined {...props} />;
            default:
                //catch-all for types that weren't anticipated
                return <div class="object-value" {...props} >
                    {variable.value}
                </div>;
        }
    }

    getEditInput = () => {
        const {variable, namespace, theme, rjvId} = this.props;
        const {editValue} = this.state;

        return (<div>
            <textarea type='text'
            value={editValue}
            class="variable-editor"
            onChange={(event)=>{
                this.setState({'editValue': event.target.value});
            }}
            placeholder="update this value"
            {...Theme(theme, 'edit-input')}
            />
            <div {...Theme(theme, 'edit-icon-container')}>
            <Cancel class="edit-cancel" {...Theme(theme, 'cancel-icon')}
            onClick={()=>{
                this.setState({editMode: false, editValue: ""});
            }}
            />
            <CheckCircle class="edit-check" {...Theme(theme, 'check-icon')}
            onClick={() => {
                const new_value = (
                    isNaN(editValue) || !editValue.trim() ? editValue : parseFloat(editValue)
                );
                this.state.editMode = false;
                this.state.hover = false;
                dispatcher.dispatch({
                    name: 'VARIABLE_UPDATED',
                    rjvId: rjvId,
                    data: {
                        name: variable.name,
                        namespace: namespace,
                        existing_value: variable.value,
                        new_value: new_value
                    },
                });
            }}
            />
            </div>

        </div>);

    }

}

//export component
export default VariableEditor;