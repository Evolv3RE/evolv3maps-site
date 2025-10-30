// Sample voltage filter UI script
document.addEventListener('DOMContentLoaded', function() {
  const select = document.createElement('select');
  select.id = 'voltageFilter';
  ['All', '69', '138', '345'].forEach(function(opt) {
    const option = document.createElement('option');
    option.value = opt;
    option.text = opt === 'All' ? 'All Voltages' : opt + ' kV';
    select.appendChild(option);
  });
  select.addEventListener('change', function(e) {
    const val = e.target.value;
    let filter = null;
    if (val !== 'All') {
      filter = ['==', ['get', 'voltage_kv'], parseInt(val)];
    }
    map.setFilter('substation-points', filter);
  });
  document.body.appendChild(select);
});
