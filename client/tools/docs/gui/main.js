$(document).ready(function() {

  // collapsible with a content in table
  let collapsible = ['methodSummary', 'staticMethodSummary', 'constructorSummary', 'staticMethodDetails'];
  collapsible.forEach((colIce) => {
    var $trigger = $('[data-ice="'+colIce+'"]');
    var $container = $trigger.find('table');
    $container.hide();
    $trigger.on('click', function() {
      $container.toggle();
    });
  });

  // collapsible without content in table
  let collapsibleNoTable = ['methodDetails', 'staticMethodDetails', 'constructorDetails'];
  collapsibleNoTable.forEach((colIce) => {
    var $trigger = $('[data-ice="'+colIce+'"]');
    $trigger.on('click', function() {
      $(this).toggleClass('collapsed');
      if ($(this).hasClass('collapsed')) {
        $(this).css({
          'max-height': '75px',
          overflow: 'hidden',
          cursor: 'pointer'
        });
      } else {
        $(this).css({
          'max-height': 'inherit',
          overflow: 'hidden'
        });
      }
    }).click();
  });

});



