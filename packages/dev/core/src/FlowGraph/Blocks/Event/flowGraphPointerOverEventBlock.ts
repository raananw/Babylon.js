import type { FlowGraphContext } from "core/FlowGraph/flowGraphContext";
import { FlowGraphEventBlock } from "core/FlowGraph/flowGraphEventBlock";
import { FlowGraphEventType } from "core/FlowGraph/flowGraphEventType";
import { FlowGraphBlockNames } from "../flowGraphBlockNames";
import type { AbstractMesh } from "core/Meshes/abstractMesh";
import type { FlowGraphDataConnection } from "core/FlowGraph/flowGraphDataConnection";
import type { IFlowGraphBlockConfiguration } from "core/FlowGraph/flowGraphBlock";
import { RichTypeAny, RichTypeNumber } from "core/FlowGraph/flowGraphRichTypes";
import { RegisterClass } from "core/Misc/typeStore";
import { _isADescendantOf } from "core/FlowGraph/utils";

/**
 * @experimental
 */
export interface IFlowGraphPointerOverEventBlockConfiguration extends IFlowGraphBlockConfiguration {
    /**
     * Should this mesh block propagation of the event.
     */
    stopPropagation?: boolean;

    /**
     * The mesh to listen to. Can also be set by the asset input.
     */
    targetMesh?: AbstractMesh;
}

export interface IFlowGraphPointerOverEventPayload {
    /**
     * The pointer id.
     */
    pointerId: number;
    /**
     * The mesh that was picked.
     */
    mesh: AbstractMesh;

    /**
     * If populated, the hover event moved from this mesh to the `mesh` variable
     */
    out?: AbstractMesh;
}

export class FlowGraphPointerOverEventBlock extends FlowGraphEventBlock {
    public readonly pointerId: FlowGraphDataConnection<number>;

    public readonly targetMesh: FlowGraphDataConnection<AbstractMesh>;

    public readonly meshUnderPointer: FlowGraphDataConnection<AbstractMesh>;

    public override readonly type = FlowGraphEventType.PointerOver;

    public constructor(config?: IFlowGraphPointerOverEventBlockConfiguration) {
        super(config);
        this.pointerId = this.registerDataOutput("pointerId", RichTypeNumber);
        this.targetMesh = this.registerDataInput("targetMesh", RichTypeAny, config?.targetMesh);
        this.meshUnderPointer = this.registerDataOutput("meshUnderPointer", RichTypeAny);
    }

    public override _executeEvent(context: FlowGraphContext, payload: IFlowGraphPointerOverEventPayload): boolean {
        const mesh = this.targetMesh.getValue(context);
        this.meshUnderPointer.setValue(payload.mesh, context);
        // skip if we moved from a mesh that is under the hierarchy of the target mesh
        const skipEvent = payload.out && _isADescendantOf(payload.out, mesh);
        this.pointerId.setValue(payload.pointerId, context);
        if (!skipEvent && (payload.mesh === mesh || _isADescendantOf(payload.mesh, mesh))) {
            this._execute(context);
            return !this.config?.stopPropagation;
        }
        return true;
    }
    public override _preparePendingTasks(_context: FlowGraphContext): void {
        // no-op
    }
    public override _cancelPendingTasks(_context: FlowGraphContext): void {
        // no-op
    }
    public override getClassName() {
        return FlowGraphBlockNames.PointerOverEvent;
    }
}

RegisterClass(FlowGraphBlockNames.PointerOverEvent, FlowGraphPointerOverEventBlock);