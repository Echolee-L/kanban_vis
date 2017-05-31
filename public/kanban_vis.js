import 'plugins/kanban_vis/kanban_vis.css';
import 'plugins/kanban_vis/kanban_vis_controller';
import TemplateVisTypeTemplateVisTypeProvider from 'ui/template_vis_type/template_vis_type';
import VisSchemasProvider from 'ui/vis/schemas';
import kanbanVisTemplate from 'plugins/kanban_vis/kanban_vis.html';
import kanbanVisParamsTemplate from 'plugins/kanban_vis/kanban_vis_params.html';

// register the provider with the visTypes registry
require('ui/registry/vis_types').register(KanbanVisTypeProvider);

// define the KanbanVisType
function KanbanVisTypeProvider(Private) {
  	const TemplateVisType = Private(TemplateVisTypeTemplateVisTypeProvider);
    const Schemas = Private(VisSchemasProvider);

  	return new TemplateVisType({
    	name: 'kanban',
    	title: 'Kanban',
    	icon: 'fa-tasks',
    	description: 'Kanban provides a board with data card, to display the data what you want',
    	template: kanbanVisTemplate,
    	params: {
      	defaults: {
        	allDetails:true
      	},
      	editor: kanbanVisParamsTemplate
    	},
    	schemas: new Schemas([
    		{
	        	group: 'metrics',
	          	name: 'metric',
	          	title: 'count',
	          	min: 1,
	          	max: 1,
              aggFilter: ['count']   	
            },
      		{
        		group: 'buckets',
        		name: 'bucket',
        		title: 'choose filed',
        		min: 1,
	          	max: 1,
        		aggFilter: ['terms']
      		}
    	])
  	});
}

export default KanbanVisTypeProvider;
