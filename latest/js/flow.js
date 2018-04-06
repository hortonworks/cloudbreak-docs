var colors = {
    black: "#fff",
    green: "#83e216",
    red: "#f77"
}

var flows = {
    "ClusterCreationFlowConfig" : "Cluster creation flow",
    "ClusterCredentialChangeFlowConfig" : "Ambari user/password change flow",
    "ClusterDownscaleFlowConfig" : "Cluster downscale flow",
    "ClusterResetFlowConfig" : "Cluster reinstall flow",
    "ClusterStartFlowConfig" : "Cluster start flow",
    "ClusterStopFlowConfig" : "Cluster stop flow",
    "ClusterSyncFlowConfig" : "Cluster synchronization flow",
    "ClusterTerminationFlowConfig" : "Cluster termination flow",
    "ClusterUpgradeFlowConfig" : "Cluster upgrade flow",
    "ClusterUpscaleFlowConfig" : "Cluster upscale flow",
    "InstanceTerminationFlowConfig" : "Instance termination flow",
    "ManualStackRepairTriggerFlowConfig" : "Manual stack repair flow",
    "StackCreationFlowConfig": "Stack creation flow",
    "StackDownscaleConfig" : "Stack downscale flow",
    "StackStartFlowConfig" : "Stack start flow",
    "StackStopFlowConfig" : "Stack stop flow",
    "StackSyncFlowConfig" : "Stack synchronization flow",
    "StackTerminationFlowConfig" : "Stack termination flow",
    "StackUpscaleConfig" : "Stack upscale flow"
};

var initGraphByDot = function(dot) {
    dot = dot.replace("{", '{\nnode [rx=5 ry=5]\nedge [minlen=5, labelpos=c, labeloffset=10 ]');
    var graph = graphlibDot.read(dot);

    graph.graph().marginx = 10;
    graph.graph().marginy = 10;
    graph.graph().rankdir = 'TB'; // TB, BT, LR, or RL
    graph.graph().align = 'UR'; // UL, UR, DL, or DR
    // graph.graph().nodesep = 50;
    graph.graph().edgesep = 30;
    graph.graph().ranksep = 8

    graph.nodes().forEach(function(v) {
        var node = graph.node(v);
        node.label = v.replace(/_STATE/g, '');
        if (node.label.indexOf("FAIL") >= 0 || node.label.indexOf("ERROR") >= 0) {
            node.color = "red";
        } else if (node.label == "INIT" || node.label == "FINAL") {
            node.color = "green";
        }
        if (node.color) {
            node.style = "fill: " + colors[node.color];
        }
    });

    graph.edges().forEach(function(e) {
        var edge = graph.edge(e);
        edge.label = edge.label.replace(/_EVENT/g, '');
    });
    
    return graph;
}

var renderSvg = function(svg, inner, graph) {
    var zoom = d3.behavior.zoom().on("zoom", function() {
        inner.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
    });
    svg.call(zoom);

    var render = new dagreD3.render();
    render(inner, graph);

    var initialScale = 0.8;
    zoom.translate([
        (svg.attr("width") - graph.graph().width * initialScale) / 2, 20
    ]).scale(initialScale).event(svg);
    svg.attr('height', graph.graph().height * initialScale + 40);
}

var sideNav = $(".col-md-3 .bs-sidenav");
var flowContaier = $("#flow-container");

for (var flow in flows) {
    $.ajax({
        async: false,
        url: "../diagrams/" + flow + ".dot",
        success: function(dot) {
            var graph = initGraphByDot(dot);
            sideNav.append('<li class="main active"><a href="#' + flow + '">' + flows[flow] + '</a></li>');
            flowContaier.append('<p><h2 id="' + flow + '">' + flows[flow] + '</h2><svg id="Svg' + flow + '" width=1000 height=600><g/></svg></p>');
            var svg = d3.select("#Svg" + flow), inner = svg.select("g");
            renderSvg(svg, inner, graph);
        }
    });
}
