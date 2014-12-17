'use strict';

// Configuring the Articles module
angular.module('Reports').run(['Menus',
    function (Menus) {
        // Set top bar menu items
        Menus.addMenuItem('topbar', 'Reports', 'reports', 'dropdown', '/reports(/create)?');
        Menus.addSubMenuItem('topbar', 'reports', 'Average', 'reports/editionavg', '', false, ['admin']);
        Menus.addSubMenuItem('topbar', 'reports', 'Evolution', 'reports/evolution', '', false, ['admin']);
        Menus.addSubMenuItem('topbar', 'reports', 'Evolution By User', 'reports/learnerevolution', '', false);
    }
]);