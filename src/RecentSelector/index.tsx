import * as React from "react";
import "./style.less";
import * as Store from "../store";
import { GithubLogoDarkMode, AddIcon } from "./icons";

interface Props {
	recentProjects: Store.Forage.ForageStructure["projects"];
}

export default class RecentSelector extends React.Component<Props> {
	private previewsURLList: { [id: string]: string } = {};

	constructor(props: Props) {
		super(props);
	}

	componentWillUnmount() {
		Object.values(this.previewsURLList).forEach(URL.revokeObjectURL);
	}

	render() {
		const savedProjects = Object.entries(this.props.recentProjects).map(([id, { preview, snapshot }]) => {
			let pictureURL = "";

			if (id in this.previewsURLList) {
				pictureURL = this.previewsURLList[id];
			} else {
				const blob = new Blob([preview], { type: "image/*" });
				pictureURL = this.previewsURLList[id] = URL.createObjectURL(blob);
			}

			const alt = `Preview of project named ${snapshot.projectOptions.title || ""} (${id})`;

			return (
				<li key={id}>
					<img alt={alt} src={pictureURL} />
					<span>{snapshot.projectOptions.title || "Untitled project"}</span>
				</li>
			);
		});

		return (
			<div id="recent-selector">
				<header>
					<div>
						<h4>Passkit Visual Designer</h4>
					</div>
					<div>
						<a href="https://git.io/JLNCQ">
							<GithubLogoDarkMode width="25px" height="25px" />
						</a>
					</div>
				</header>
				<main>
					<div className="centered-column">
						<section>
							<div id="choices-box">
								<div>
									<AddIcon width="32px" height="32px" fill="#000" />
									<span>Create Project</span>
								</div>
								<div>
									<AddIcon width="32px" height="32px" fill="#000" />
									<span>Upload pass</span>
								</div>
							</div>
						</section>
						<section>
							<div className="recents-box">
								<header>
									<h2>Recent Projects</h2>
									<span>edit</span>
								</header>
								<main>
									<ul>
										{savedProjects}
									</ul>
								</main>
							</div>
						</section>
					</div>
				</main>
				{/* 				<div id="list">
					<div>
						<div className="new"></div>
						<span>Create new project</span>
					</div>
					{savedProjects}
				</div> */}
			</div>
		);
	}
}
