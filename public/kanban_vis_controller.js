import AggResponseTabifyTabifyProvider from 'ui/agg_response/tabify/tabify';
import uiModules from 'ui/modules';

// get the kibana/kanban_vis module, and make sure that it requires the "kibana" module if it didn't already
const module = uiModules.get('kibana/kanban_vis', ['kibana']);


module.controller('KbnKanbanVisController', function($scope, $element, Private) {
	const tabifyAggResponse = Private(AggResponseTabifyTabifyProvider);
	let data, selectedField;
	let details = [];
	let headers = [];
	
	$scope.$watch('vis.params', function(params) {
		$scope.kanbanGen();
	});

	// kanban generator
	$scope.kanbanGen = function kanbanGen() {
		$scope.data = data;
		$scope.selectedField = selectedField;
		$scope.details = details;
		
		if ($scope.vis.params.header) {
			let hTmp = [];
			hTmp = $scope.vis.params.header.split(',');
			
			hTmp.forEach(function (k,i) {
				for (let t in details[0]) {
					if (t === k) {
						headers.indexOf(k) === -1 ? headers.push(k) : '';
					}
				}
			});
		}
		$scope.headers = headers;
	}
	
	$scope.add = function(k) {
		if (headers.indexOf(k) === -1) {
			headers.push(k);
			$scope.kanbanGen();
		}
	}
	$scope.remove = function(i, k) {
		headers.splice(i, 1);
		$scope.kanbanGen();
	}

	// Get data from ES
	$scope.processTableGroups = function (tableGroups) {
		tableGroups.tables.forEach(function (table) {
			table.columns.forEach(function (column, i) {
				data = table.rows; //all values of current field and the count of every value
				selectedField = table.columns[0].title.split(':')[0].split('.')[0];
			});
		});
	};
	
	$scope.$watch('esResponse', function(resp) {
		let temp = [];
		if (resp) {
			$scope.processTableGroups(tabifyAggResponse($scope.vis, resp));
			resp.hits.hits.forEach(function (obj) {
				temp.push(obj._source);
				details = temp;
			});
			$scope.kanbanGen();
		}
	});
});