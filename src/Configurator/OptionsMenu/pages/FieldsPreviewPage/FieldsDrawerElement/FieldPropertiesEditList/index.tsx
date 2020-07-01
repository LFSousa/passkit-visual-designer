import * as React from "react";
import "./style.less";
import { PKTextAlignment, PKDateStyle, PKDataDetectorType } from "../../../../../../passes/constants";
import { FieldProperties } from "../FieldProperties";
import FieldStringPropertyPanel from "./FieldPropertyPanels/String";
import FieldCheckboxPropertyPanel from "./FieldPropertyPanels/Checkbox";
import FieldEnumPropertyPanel from "./FieldPropertyPanels/Enum";

interface FieldPropertiesEditListProps { }

export default function FieldPropertiesEditList(props: FieldPropertiesEditListProps) {
	const properties = FieldProperties.map(({ name, type, placeholder }) => {
		if (isPanelTypeEnum(type)) {
			return (
				<FieldEnumPropertyPanel
					key={name}
					name={name}
					options={type}
					onValueChange={() => console.log("attempting to change enum")}
				/>
			);
		}

		if (isPanelTypeString(type)) {
			return (
				<FieldStringPropertyPanel
					key={name}
					name={name}
					placeholder={placeholder}
					onValueChange={() => console.log("attempting to change string")}
				/>
			);
		}

		if (isPanelTypeCheckbox(type)) {
			return (
				<FieldCheckboxPropertyPanel
					key={name}
					name={name}
					onValueChange={() => console.log("attempting to change checkbox")}
				/>
			);
		}
	});

	return (
		<div className="field-properties-edit-list">
			{properties}
		</div>
	);
}

function isPanelTypeEnum(type: Object) {
	return type === PKTextAlignment || type === PKDateStyle || type === PKDataDetectorType;
}

function isPanelTypeString(type: Object) {
	return type === String;
}

function isPanelTypeCheckbox(type: Object) {
	return type === Boolean;
}
