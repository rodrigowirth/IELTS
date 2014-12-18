'use strict';

// Configuring the Articles module
angular.module('Reports').run(['Menus',
    function (Menus) {
        // Set top bar menu items
        Menus.addMenuItem('topbar', 'Reports', 'reports', 'dropdown', '/reports(/create)?');
        Menus.addSubMenuItem('topbar', 'reports', 'Average', 'reports/editionavg', '', false, ['admin']);
        Menus.addSubMenuItem('topbar', 'reports', 'Bravi Progress', 'reports/progress', '', false, ['admin']);
        Menus.addSubMenuItem('topbar', 'reports', 'Applicants', 'reports/applicants', '', false, ['admin']);
        Menus.addSubMenuItem('topbar', 'reports', 'My Progress', 'reports/myprogress', '', false);
    }
]);