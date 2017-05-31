export default function (kibana) {
	
	return new kibana.Plugin({
		uiExports: {
			visTypes: [
				'plugins/kanban_vis/kanban_vis'
      		]
    	}
  	});
};