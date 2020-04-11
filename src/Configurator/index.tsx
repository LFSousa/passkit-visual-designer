import * as React from "react";
import "./style.less";
import Viewer, { ViewerProps } from "./Viewer";
import OptionsBar from "./OptionsBar";
import OptionsMenu from "./OptionsMenu";
import { FieldKind } from "../model";
import { InteractionContext } from "../passes/PassCore/interactionContext";

interface ConfiguratorProps extends ViewerProps { }
interface ConfiguratorState {
	selectedFieldId?: string;
}

export default class Configurator extends React.Component<ConfiguratorProps, ConfiguratorState> implements InteractionContext {
	registeredFields: Map<string, FieldKind> = new Map();

	constructor(props: ConfiguratorProps) {
		super(props);

		this.registerField = this.registerField.bind(this);
		this.onFieldSelect = this.onFieldSelect.bind(this);
		this.onVoidClick = this.onVoidClick.bind(this);
		this.onValueChange = this.onValueChange.bind(this);

		this.state = {
			selectedFieldId: null,
		};
	}

	/**
	 * This function role is to register the fields that
	 * will be shown in the OptionsMenu
	 *
	 * @param kind
	 * @param id
	 */

	registerField(kind: FieldKind, id: string): boolean {
		console.log("Received registration request for", kind, "+", id);

		if (this.registeredFields.has(id)) {
			console.log("...but failed due to duplicate already available");
			return false;
		}

		this.registeredFields.set(id, kind);

		return true;
	}

	/**
	 * This function role is to notify the OptionsMenu
	 * to highlight the linked field
	 */

	onFieldSelect(id: string): void {
		this.setState({ selectedFieldId: id });
		console.log(id, "selected");
	}

	/**
	 * Updates the storage after a value from
	 * configurator has been changed and confirmed.
	 *
	 * @param key
	 * @param value
	 */

	onValueChange(key: string, value: any): boolean {
		// @TODO: validate the input
		// @TODO: save to store
		// @TODO: save to localForage

		// @TODO: return false if cannot validate the input
		return true;
	}

	/**
	 * Allows clicking on the void area
	 * to deselect around the pass to remove
	 * field selection
	 *
	 * @param e
	 */

	onVoidClick(e: React.MouseEvent) {
		if (e.target !== e.currentTarget) {
			return;
		}

		this.setState({ selectedFieldId: null });
	}

	render() {
		return (
			<div id="configurator">
				<div className="screen">
					<Viewer
						{...this.props}
						onFieldSelect={this.onFieldSelect}
						registerField={this.registerField}
						onVoidClick={this.onVoidClick}
					/>
					<OptionsBar />
				</div>
				<div className="config-panel">
					<OptionsMenu
						selection={this.state.selectedFieldId}
						onValueChange={this.onValueChange}
					/>
				</div>
			</div>
		);
	}
}
