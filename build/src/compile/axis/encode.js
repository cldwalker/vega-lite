"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var channel_1 = require("../../channel");
var fielddef_1 = require("../../fielddef");
var scale_1 = require("../../scale");
var type_1 = require("../../type");
var util_1 = require("../../util");
var common_1 = require("../common");
var config_1 = require("./config");
function labels(model, channel, specifiedLabelsSpec, orient) {
    var fieldDef = model.fieldDef(channel) ||
        (channel === 'x' ? model.fieldDef('x2') :
            channel === 'y' ? model.fieldDef('y2') :
                undefined);
    var axis = model.axis(channel);
    var config = model.config;
    var labelsSpec = {};
    // Text
    if (fielddef_1.isTimeFieldDef(fieldDef)) {
        var isUTCScale = model.getScaleComponent(channel).get('type') === scale_1.ScaleType.UTC;
        labelsSpec.text = {
            signal: common_1.timeFormatExpression('datum.value', fieldDef.timeUnit, axis.format, config.axis.shortTimeLabels, config.timeFormat, isUTCScale)
        };
    }
    // Label Angle
    var angle = config_1.getAxisConfig('labelAngle', model.config, channel, orient, model.getScaleComponent(channel).get('type'));
    if (angle === undefined) {
        angle = labelAngle(axis, channel, fieldDef);
        if (angle) {
            labelsSpec.angle = { value: angle };
        }
    }
    if (angle !== undefined && channel === 'x') {
        var align = labelAlign(angle, orient);
        if (align) {
            labelsSpec.align = { value: align };
        }
        // Auto set baseline if x is rotated by 90, or -90
        if (util_1.contains([90, 270], angle)) {
            labelsSpec.baseline = { value: 'middle' };
        }
    }
    labelsSpec = tslib_1.__assign({}, labelsSpec, specifiedLabelsSpec);
    return util_1.keys(labelsSpec).length === 0 ? undefined : labelsSpec;
}
exports.labels = labels;
function labelAngle(axis, channel, fieldDef) {
    if (axis.labelAngle !== undefined) {
        // Make angle within [0,360)
        return ((axis.labelAngle % 360) + 360) % 360;
    }
    else {
        if (channel === channel_1.X && util_1.contains([type_1.NOMINAL, type_1.ORDINAL], fieldDef.type)) {
            return 270;
        }
    }
    return undefined;
}
exports.labelAngle = labelAngle;
function labelAlign(angle, orient) {
    if (angle > 0) {
        if (angle % 360 > 180) {
            return orient === 'top' ? 'left' : 'right';
        }
        else if (angle % 360 < 180) {
            return orient === 'top' ? 'right' : 'left';
        }
    }
    else if (angle < 0) {
        return labelAlign((angle % 360) + 360 /* convert to positive value*/, orient);
    }
    return undefined;
}
exports.labelAlign = labelAlign;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW5jb2RlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2NvbXBpbGUvYXhpcy9lbmNvZGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQ0EseUNBQStEO0FBQy9ELDJDQUF3RDtBQUN4RCxxQ0FBc0M7QUFDdEMsbUNBQTRDO0FBQzVDLG1DQUEwQztBQUUxQyxvQ0FBK0M7QUFFL0MsbUNBQXVDO0FBRXZDLGdCQUF1QixLQUFnQixFQUFFLE9BQTZCLEVBQUUsbUJBQXdCLEVBQUUsTUFBa0I7SUFDbEgsSUFBTSxRQUFRLEdBQUcsS0FBSyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUM7UUFDdEMsQ0FDRSxPQUFPLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDeEMsT0FBTyxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO2dCQUN4QyxTQUFTLENBQ1YsQ0FBQztJQUNKLElBQU0sSUFBSSxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDakMsSUFBTSxNQUFNLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQztJQUU1QixJQUFJLFVBQVUsR0FBUSxFQUFFLENBQUM7SUFFekIsT0FBTztJQUNQLEVBQUUsQ0FBQyxDQUFDLHlCQUFjLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzdCLElBQU0sVUFBVSxHQUFHLEtBQUssQ0FBQyxpQkFBaUIsQ0FBQyxPQUFPLENBQUMsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLEtBQUssaUJBQVMsQ0FBQyxHQUFHLENBQUM7UUFFbEYsVUFBVSxDQUFDLElBQUksR0FBRztZQUNoQixNQUFNLEVBQUUsNkJBQW9CLENBQUMsYUFBYSxFQUFFLFFBQVEsQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLE1BQU0sRUFB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