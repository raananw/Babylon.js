import type { IFlowGraphBlockConfiguration } from "core/FlowGraph/flowGraphBlock";
import { FlowGraphUnaryOperationBlock } from "../flowGraphUnaryOperationBlock";
import { RichTypeBoolean, RichTypeFlowGraphInteger, RichTypeNumber } from "core/FlowGraph/flowGraphRichTypes";
import { FlowGraphBlockNames } from "../../flowGraphBlockNames";
import { RegisterClass } from "core/Misc/typeStore";
import { FlowGraphInteger } from "core/FlowGraph/flowGraphInteger";

/**
 * A block that converts a boolean to a float.
 */
export class FlowGraphBooleanToFloat extends FlowGraphUnaryOperationBlock<boolean, number> {
    constructor(config?: IFlowGraphBlockConfiguration) {
        super(RichTypeBoolean, RichTypeNumber, (a) => +a, FlowGraphBlockNames.BooleanToFloat, config);
    }
}

RegisterClass(FlowGraphBlockNames.BooleanToFloat, FlowGraphBooleanToFloat);

/**
 * A block that converts a boolean to an integer
 */
export class FlowGraphBooleanToInt extends FlowGraphUnaryOperationBlock<boolean, FlowGraphInteger> {
    constructor(config?: IFlowGraphBlockConfiguration) {
        super(RichTypeBoolean, RichTypeFlowGraphInteger, (a) => FlowGraphInteger.FromValue(+a), FlowGraphBlockNames.BooleanToInt, config);
    }
}

RegisterClass(FlowGraphBlockNames.BooleanToInt, FlowGraphBooleanToInt);

/**
 * A block that converts a float to a boolean.
 */
export class FlowGraphFloatToBoolean extends FlowGraphUnaryOperationBlock<number, boolean> {
    constructor(config?: IFlowGraphBlockConfiguration) {
        super(RichTypeNumber, RichTypeBoolean, (a) => !!a, FlowGraphBlockNames.FloatToBoolean, config);
    }
}

RegisterClass(FlowGraphBlockNames.FloatToBoolean, FlowGraphFloatToBoolean);

/**
 * A block that converts an integer to a boolean.
 */
export class FlowGraphIntToBoolean extends FlowGraphUnaryOperationBlock<FlowGraphInteger, boolean> {
    constructor(config?: IFlowGraphBlockConfiguration) {
        super(RichTypeFlowGraphInteger, RichTypeBoolean, (a) => !!a.value, FlowGraphBlockNames.IntToBoolean, config);
    }
}

RegisterClass(FlowGraphBlockNames.IntToBoolean, FlowGraphIntToBoolean);

/**
 * A block that converts an integer to a float.
 */
export class FlowGraphIntToFloat extends FlowGraphUnaryOperationBlock<FlowGraphInteger, number> {
    constructor(config?: IFlowGraphBlockConfiguration) {
        super(RichTypeFlowGraphInteger, RichTypeNumber, (a) => a.value, FlowGraphBlockNames.IntToFloat, config);
    }
}

RegisterClass(FlowGraphBlockNames.IntToFloat, FlowGraphIntToFloat);

/**
 * A block that converts a float to an integer.
 */
export class FlowGraphFloatToInt extends FlowGraphUnaryOperationBlock<number, FlowGraphInteger> {
    constructor(config?: IFlowGraphBlockConfiguration) {
        super(RichTypeNumber, RichTypeFlowGraphInteger, (a) => FlowGraphInteger.FromValue(a), FlowGraphBlockNames.FloatToInt, config);
    }
}

RegisterClass(FlowGraphBlockNames.FloatToInt, FlowGraphFloatToInt);