//131021.js
//Flatmap
//@RAB1138
//
//

$(function() {
    $('#tree1').tree({
        data: layerData
    });
});

var layerData = [
    {
        label: 'Layer 1',
        children: [
            { label: 'ACB' }           
        ]
    }
];