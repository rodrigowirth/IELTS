'use strict';

// Configuring the Articles module
angular.module('Reports').run(['Menus',
    function (Menus) {
        // Set top bar menu items
        Menus.addMenuItem('topbar', 'Reports', 'reports', 'dropdown', '/reports(/create)?');
        Menus.addSubMenuItem('topbar', 'reports', 'Avarage', 'reports/editionavg');
        Menus.addSubMenuItem('topbar', 'reports', 'Evolution', '/');
    }
]);