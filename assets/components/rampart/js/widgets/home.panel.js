Rampart.panel.Home = function(config) {
    config = config || {};
    Ext.apply(config,{
        border: false
        ,baseCls: 'modx-formpanel container'
        ,items: [{
            html: '<h2>'+'Rampart'+'</h2>'
            ,border: false
            ,cls: 'modx-page-header'
        },{
            xtype: 'modx-tabs'
            ,bodyStyle: 'padding: 10px'
            ,defaults: { border: false ,autoHeight: true }
            ,border: true
            ,stateful: true
            ,stateId: 'rpt-home-tabpanel'
            ,stateEvents: ['tabchange']
            ,getState:function() {
                return {activeTab:this.items.indexOf(this.getActiveTab())};
            }
            ,items: [{
                title: _('rampart.bans')
                ,defaults: { autoHeight: true }
                ,items: [{
                    html: '<p>'+_('rampart.bans.intro_msg')+'</p>'
                    ,border: false
                    ,bodyStyle: 'padding: 10px'
                },{
                    xtype: 'rpt-grid-bans'
                    ,preventRender: true
                }]
            },{
                title: _('rampart.moderated_users')
                ,defaults: { autoHeight: true }
                ,items: [{
                    html: '<p>'+_('rampart.moderated_users.intro_msg')+'</p>'
                    ,border: false
                    ,bodyStyle: 'padding: 10px'
                },{
                    xtype: 'rpt-grid-moderated-users'
                    ,preventRender: true
                }]
            },{
                title: _('rampart.whitelist')
                ,defaults: { autoHeight: true }
                ,items: [{
                    html: '<p>'+_('rampart.whitelist.intro_msg')+'</p>'
                    ,border: false
                    ,bodyStyle: 'padding: 10px'
                },{
                    xtype: 'rpt-grid-whitelist'
                    ,preventRender: true
                }]
            }]
        }]
    });
    Rampart.panel.Home.superclass.constructor.call(this,config);
};
Ext.extend(Rampart.panel.Home,MODx.Panel);
Ext.reg('rpt-panel-home',Rampart.panel.Home);

Rampart.grid.Bans = function(config) {
    config = config || {};
    this.sm = new Ext.grid.CheckboxSelectionModel();
    Ext.applyIf(config,{
        url: Rampart.config.connector_url
        ,baseParams: { action: Rampart.config.modx3 ?
                'Rampart\\Processors\\Ban\\GetList'
                : 'mgr/ban/getList' }
        ,save_action: Rampart.config.modx3 ?
            'Rampart\\Processors\\Ban\\UpdateFromGrid'
            : 'mgr/ban/updateFromGrid'
        ,fields: ['id','name','reason','ip','hostname','email','username','expireson','matches','active','notes']
        ,paging: true
        ,autosave: true
        ,remoteSort: true
        ,viewConfig: {
            forceFit:true
            ,enableRowBody:true
            ,scrollOffset: 0
            ,autoFill: true
            ,showPreview: true
            ,getRowClass : function(rec, ri, p){
                return rec.data.active ? 'grid-row-active' : 'grid-row-inactive';
            }
        }
        ,sm: this.sm
        ,columns: [this.sm,{
            header: _('id')
            ,dataIndex: 'id'
            ,sortable: false
            ,hidden: true
        },{
            header: _('rampart.reason')
            ,dataIndex: 'reason'
            ,sortable: true
            ,width: 150
            ,editor: { xtype: 'textfield' }
        },{
            header: _('rampart.ip_range')
            ,dataIndex: 'ip'
            ,sortable: true
            ,width: 120
            ,editor: { xtype: 'textfield' }
        },{
            header: _('rampart.hostname')
            ,dataIndex: 'hostname'
            ,sortable: true
            ,width: 120
            ,editor: { xtype: 'textfield' }
        },{
            header: _('rampart.email')
            ,dataIndex: 'email'
            ,sortable: true
            ,width: 80
            ,editor: { xtype: 'textfield' }
        },{
            header: _('rampart.username')
            ,dataIndex: 'username'
            ,sortable: true
            ,width: 80
            ,editor: { xtype: 'textfield' }
        },{
            header: _('rampart.expireson')
            ,dataIndex: 'expireson'
            ,sortable: true
            ,width: 80
        },{
            header: _('rampart.matches')
            ,dataIndex: 'matches'
            ,sortable: true
            ,width: 80
        }]
        ,tbar: [{
            text: _('rampart.bulk_actions')
            ,menu: [{
                text: _('rampart.activate_selected')
                ,handler: this.activateSelected
                ,scope: this
            },{
                text: _('rampart.deactivate_selected')
                ,handler: this.deactivateSelected
                ,scope: this
            },'-',{
                text: _('rampart.remove_selected')
                ,handler: this.removeSelected
                ,scope: this
            }]
        },'-',{
            text: _('rampart.ban_add_new')
            ,handler: this.addNewBan
            ,scope: this
        },'->',{
            xtype: 'textfield'
            ,name: 'search'
            ,id: 'rpt-bans-tf-search'
            ,emptyText: _('search')+'...'
            ,listeners: {
                'change': {fn: this.search, scope: this}
                ,'render': {fn: function(cmp) {
                    new Ext.KeyMap(cmp.getEl(), {
                        key: Ext.EventObject.ENTER
                        ,fn: function() {
                            this.fireEvent('change',this.getValue());
                            this.blur();
                            return true;}
                        ,scope: cmp
                    });
                },scope:this}
            }
        },{
            xtype: 'button'
            ,id: 'rpt-bans-filter-clear'
            ,text: _('filter_clear')
            ,listeners: {
                'click': {fn: this.clearFilter, scope: this}
            }
        }]
    });
    Rampart.grid.Bans.superclass.constructor.call(this,config)
};
Ext.extend(Rampart.grid.Bans,MODx.grid.Grid,{
    _addEnterKeyHandler: function() {
        this.getEl().addKeyListener(Ext.EventObject.ENTER,function() {
            this.fireEvent('change');
        },this);
    }
    ,clearFilter: function() {
    	var s = this.getStore();
        s.baseParams.search = '';
        Ext.getCmp('rpt-bans-tf-search').reset();
    	this.getBottomToolbar().changePage(1);
        this.refresh();
    }
    ,search: function(tf,newValue,oldValue) {
        var nv = newValue || tf;
        this.getStore().baseParams.search = nv;
        this.getBottomToolbar().changePage(1);
        this.refresh();
        return true;
    }
    ,getSelectedAsList: function() {
        var sels = this.getSelectionModel().getSelections();
        if (sels.length <= 0) return false;

        var cs = '';
        for (var i=0;i<sels.length;i++) {
            cs += ','+sels[i].data[this.config.primaryKey || 'id'];
        }

        if (cs[0] == ',') {
            cs = cs.substr(1);
        }
        return cs;
    }
    ,addNewBan: function(btn,e) {
        if (!this.addBanWindow) {
            this.addBanWindow = MODx.load({
                xtype: 'rpt-window-ban-create'
                ,record: {}
                ,listeners: {
                    'success': {fn:this.refresh,scope:this}
                }
            });
        }
        this.addBanWindow.reset();
        this.addBanWindow.show(e.target);
    }
    ,updateBan: function(btn,e) {
        location.href = '?a=ban/update&namespace=rampart&id='+this.menu.record.id;
    }
    ,duplicateBan: function(btn,e) {
        MODx.Ajax.request({
            url: this.config.url
            ,params: {
                action: Rampart.config.modx3 ?
                    'Rampart\\Processors\\Ban\\Duplicate'
                    : 'mgr/ban/duplicate'
                ,id: this.menu.record.id
            }
            ,listeners: {
                'success': {fn:this.refresh,scope:this}
            }
        });
    }
    ,removeBan: function() {
        MODx.msg.confirm({
            title: _('warning')
            ,text: _('rampart.ban_remove_confirm')
            ,url: this.config.url
            ,params: {
                action: Rampart.config.modx3 ?
                    'Rampart\\Processors\\Ban\\Remove'
                    : 'mgr/ban/remove'
                ,id: this.menu.record.id
            }
            ,listeners: {
                'success': {fn:this.refresh,scope:this}
            }
        });
    }
    ,removeSelected: function() {
        var cs = this.getSelectedAsList();
        if (cs === false) return false;

        MODx.msg.confirm({
            title: _('rampart.ban_remove_selected')
            ,text: _('rampart.ban_remove_selected_confirm')
            ,url: this.config.url
            ,params: {
                action: Rampart.config.modx3 ?
                    'Rampart\\Processors\\Ban\\Multiple\\Remove'
                    : 'mgr/ban/removeMultiple'
                ,bans: cs
            }
            ,listeners: {
                'success': {fn:function(r) {
                    this.getSelectionModel().clearSelections(true);
                    this.refresh();
                },scope:this}
            }
        });
        return true;
    }

    ,activateBan: function(btn,e) {
        MODx.Ajax.request({
            url: this.config.url
            ,params: {
                action: Rampart.config.modx3 ?
                    'Rampart\\Processors\\Ban\\Activate'
                    : 'mgr/ban/activate'
                ,id: this.menu.record.id
            }
            ,listeners: {
                'success': {fn:this.refresh,scope:this}
            }
        });
    }

    ,activateSelected: function() {
        var cs = this.getSelectedAsList();
        if (cs === false) return false;

        MODx.Ajax.request({
            url: this.config.url
            ,params: {
                action: Rampart.config.modx3 ?
                    'Rampart\\Processors\\Ban\\Multiple\\Activate'
                    : 'mgr/ban/activateMultiple'
                ,bans: cs
            }
            ,listeners: {
                'success': {fn:function(r) {
                    this.getSelectionModel().clearSelections(true);
                    this.refresh();
                },scope:this}
            }
        });
        return true;
    }
    ,deactivateBan: function(btn,e) {
        MODx.Ajax.request({
            url: this.config.url
            ,params: {
                action: Rampart.config.modx3 ?
                    'Rampart\\Processors\\Ban\\Deactivate'
                    : 'mgr/ban/deactivate'
                ,id: this.menu.record.id
            }
            ,listeners: {
                'success': {fn:this.refresh,scope:this}
            }
        });
    }
    ,deactivateSelected: function() {
        var cs = this.getSelectedAsList();
        if (cs === false) return false;

        MODx.Ajax.request({
            url: this.config.url
            ,params: {
                action: Rampart.config.modx3 ?
                    'Rampart\\Processors\\Ban\\Multiple\\Deactivate'
                    : 'mgr/ban/deactivateMultiple'
                ,bans: cs
            }
            ,listeners: {
                'success': {fn:function(r) {
                    this.getSelectionModel().clearSelections(true);
                    this.refresh();
                },scope:this}
            }
        });
        return true;
    }
    
    ,getMenu: function() {

        var m = [];
        if (this.getSelectionModel().getCount() > 1) {
            var rs = this.getSelectionModel().getSelections();

            m.push({
                text: _('rampart.activate_selected')
                ,handler: this.activateSelected
                ,scope: this
            });
            m.push({
                text: _('rampart.deactivate_selected')
                ,handler: this.deactivateSelected
                ,scope: this
            });
            m.push('-');
            m.push({
                text: _('rampart.remove_selected')
                ,handler: this.removeSelected
            });
        } else {
            var r = this.getSelectionModel().getSelected();

            m.push({
                text: _('rampart.ban_update')
                ,handler: this.updateBan
            });
            m.push({
                text: _('rampart.ban_duplicate')
                ,handler: this.duplicateBan
            });
            m.push('-');
            if (!this.menu.record.active) {
                m.push({
                    text: _('rampart.ban_activate')
                    ,handler: this.activateBan
                });
            } else {
                m.push({
                    text: _('rampart.ban_deactivate')
                    ,handler: this.deactivateBan
                });
            }
            m.push('-');
            m.push({
                text: _('rampart.ban_remove')
                ,handler: this.removeBan
            });
        }
        if (m.length > 0) {
            this.addContextMenuItem(m);
        }
    }
});
Ext.reg('rpt-grid-bans',Rampart.grid.Bans);



Rampart.window.CreateBan = function(config) {
    config = config || {};
    this.ident = config.ident || 'rpt-cban-'+Ext.id();
    Ext.applyIf(config,{
        title: _('rampart.ban_add_new')
        ,height: 150
        ,width: 600
        ,url: Rampart.config.connectorUrl
        ,action: Rampart.config.modx3 ?
            'Rampart\\Processors\\Ban\\Create'
            : 'mgr/ban/create'
        ,fields: [{
            layout: 'column'
            ,border: false
            ,defaults: {
                layout: 'form'
                ,labelAlign: 'top'
                ,anchor: '100%'
                ,border: false
            }
            ,items: [{
                columnWidth: .5
                ,cls: 'main-content'
                ,items: [{
                    fieldLabel: _('rampart.reason')
                    ,description: MODx.expandHelp ? '' : _('rampart.reason_desc')
                    ,name: 'reason'
                    ,id: this.ident+'-reason'
                    ,xtype: 'textarea'
                    ,allowBlank: true
                    ,anchor: '100%'
                },{
                    xtype: MODx.expandHelp ? 'label' : 'hidden'
                    ,forId: this.ident+'-reason'
                    ,html: _('rampart.reason_desc')
                    ,cls: 'desc-under'

                },{
                    fieldLabel: _('rampart.email')
                    ,description: MODx.expandHelp ? '' : _('rampart.email_desc')
                    ,name: 'email'
                    ,id: this.ident+'-email'
                    ,xtype: 'textfield'
                    ,allowBlank: true
                    ,anchor: '100%'
                },{
                    xtype: MODx.expandHelp ? 'label' : 'hidden'
                    ,forId: this.ident+'-email'
                    ,html: _('rampart.email_desc')
                    ,cls: 'desc-under'

                },{
                    fieldLabel: _('rampart.username')
                    ,description: MODx.expandHelp ? '' : _('rampart.username_desc')
                    ,name: 'username'
                    ,id: this.ident+'-username'
                    ,xtype: 'textfield'
                    ,allowBlank: true
                    ,anchor: '100%'
                },{
                    xtype: MODx.expandHelp ? 'label' : 'hidden'
                    ,forId: this.ident+'-username'
                    ,html: _('rampart.username_desc')
                    ,cls: 'desc-under'

                },{
                    fieldLabel: _('rampart.expireson')
                    ,description: MODx.expandHelp ? '' : _('rampart.expireson_desc')
                    ,name: 'expireson'
                    ,id: this.ident+'-expireson'
                    ,xtype: 'xdatetime'
                    ,allowBlank: true
                    ,anchor: '98%'
                },{
                    xtype: MODx.expandHelp ? 'label' : 'hidden'
                    ,forId: this.ident+'-expireson'
                    ,html: _('rampart.expireson_desc')
                    ,cls: 'desc-under'

                }]
            },{
                columnWidth: .5
                ,cls: 'main-content'
                ,items: [{
                    fieldLabel: _('rampart.ip_range')
                    ,description: MODx.expandHelp ? '' : _('rampart.ip_range_desc')
                    ,name: 'ip'
                    ,id: this.ident+'-ip-range'
                    ,xtype: 'textfield'
                    ,allowBlank: true
                    ,anchor: '100%'
                },{
                    xtype: MODx.expandHelp ? 'label' : 'hidden'
                    ,forId: this.ident+'-ip-range'
                    ,html: _('rampart.ip_range_desc')
                    ,cls: 'desc-under'

                },{
                    fieldLabel: _('rampart.hostname')
                    ,description: MODx.expandHelp ? '' : _('rampart.hostname_desc')
                    ,name: 'hostname'
                    ,id: this.ident+'-hostname'
                    ,xtype: 'textfield'
                    ,allowBlank: true
                    ,anchor: '100%'
                },{
                    xtype: MODx.expandHelp ? 'label' : 'hidden'
                    ,forId: this.ident+'-hostname'
                    ,html: _('rampart.hostname_desc')
                    ,cls: 'desc-under'

                },{
                    fieldLabel: _('rampart.notes')
                    ,description: MODx.expandHelp ? '' : _('rampart.notes_desc')
                    ,name: 'notes'
                    ,id: this.ident+'-notes'
                    ,xtype: 'textarea'
                    ,allowBlank: true
                    ,anchor: '100%'
                },{
                    xtype: MODx.expandHelp ? 'label' : 'hidden'
                    ,forId: this.ident+'-notes'
                    ,html: _('rampart.notes_desc')
                    ,cls: 'desc-under'

                }]
            }]
        }]
    });
    Rampart.window.CreateBan.superclass.constructor.call(this,config);
};
Ext.extend(Rampart.window.CreateBan,MODx.Window);
Ext.reg('rpt-window-ban-create',Rampart.window.CreateBan);
