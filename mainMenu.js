// MENU
module.exports =

  // let mainMenu = new Menu();
  // let menuItem1 = new MenuItem({
  //   label: 'Electron',
  //   submenu: [{
  //       label: 'Item 1'
  //     },
  //     {
  //       label: 'Item 2'
  //     },
  //     {
  //       label: 'Item 3'
  //     }
  //   ]
  // });
  // mainMenu.append(menuItem1);

  [{
      label: 'Electron',
      submenu: [{
          label: 'Item 1'
        },
        {
          label: 'Item 2'
        },
        {
          label: 'Item 3'
        }
      ]
    },
    {
      label: 'Actions',
      submenu: [{
          label: 'Greet',
          click: () => {
            console.log('Greet clicked!');
          },
          accelerator: 'Shift+Alt+G',
          submenu: [{
              label: 'Greet Bob',
              click: () => {
                console.log('Greet Bob clicked!');
              },
              enabled: false
            },
            {
              label: 'Greet Lars',
              click: () => {
                console.log('Greet Lars clicked!');
              }
            }
          ]
        },
        {
          label: 'Toggle Developer Tools',
          role: 'toggledevtools'
        },
        {
          role: 'togglefullscreen'
        }
      ]
    },
    {
      label: 'Edit',
      submenu: [{
          role: 'copy'
        },
        {
          role: 'paste'
        },
        {
          role: 'undo'
        },
        {
          role: 'redo'
        }
      ]
    }
  ]