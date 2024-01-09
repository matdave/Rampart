
Rampart.grid.BanMatches = function(config) {
    config = config || {};
    Ext.applyIf(config,{
        url: Rampart.config.connector_url
        ,baseParams: { action: Rampart.config.modx3 ?
                'Rampart\\Processors\\Matches\\GetList'
                : 'mgr/matches/getList' }
        ,save_action: Rampart.config.modx3 ?
            'Rampart\\Processors\\Matches\\UpdateFromGrid'
            : 'mgr/matches/updateFromGrid'
        ,fields: ['id','username','username_match','email','email_match','ip','ip_match','hostname','hostname_match','useragent','createdon','resource','pagetitle']
        ,paging: true
        ,autosave: true
        ,remoteSort: true
        ,columns: [{
            header: _('id')
            ,dataIndex: 'id'
            ,sortable: false
            ,hidden: true
        },{
            header: _('rampart.username')
            ,dataIndex: 'username'
            ,sortable: true
            ,width: 70
            ,renderer: this._renderMatch.createDelegate(this,[this,'username'],true)
        },{
            header: _('rampart.email')
            ,dataIndex: 'email'
            ,sortable: true
            ,width: 80
            ,renderer: this._renderMatch.createDelegate(this,[this,'email'],true)
        },{
            header: _('rampart.ip')
            ,dataIndex: 'ip'
            ,sortable: true
            ,width: 60
            ,renderer: this._renderMatch.createDelegate(this,[this,'ip'],true)
        },{
            header: _('rampart.hostname')
            ,dataIndex: 'hostname'
            ,sortable: true
            ,width: 100
            ,renderer: this._renderMatch.createDelegate(this,[this,'hostname'],true)
        },{
            header: _('rampart.useragent')
            ,dataIndex: 'useragent'
            ,sortable: true
            ,width: 120
        },{
            header: _('rampart.attemptedon')
            ,dataIndex: 'createdon'
            ,sortable: true
            ,width: 80
        },{
            header: _('rampart.resource')
            ,dataIndex: 'pagetitle'
            ,sortable: false
            ,width: 100
        }]
        ,tbar: ['->',{
            xtype: 'textfield'
            ,name: 'search'
            ,id: 'rpt-bms-tf-search'
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
            ,id: 'rpt-bms-filter-clear'
            ,text: _('filter_clear')
            ,listeners: {
                'click': {fn: this.clearFilter, scope: this}
            }
        }]
    });
    Rampart.grid.BanMatches.superclass.constructor.call(this,config)
};
Ext.extend(Rampart.grid.BanMatches,MODx.grid.Grid,{
    _addEnterKeyHandler: function() {
        this.getEl().addKeyListener(Ext.EventObject.ENTER,function() {
            this.fireEvent('change');
        },this);
    }
    ,_renderMatch: function(v,md,rec,ri,ci,s,g,fld){
        var css = !Ext.isEmpty(rec.data[fld+'_match']) ? 'red' : '';

        return String.format(
            '<span class="'+css+'">'+v+'</span>'
        );
    }
    ,clearFilter: function() {
    	var s = this.getStore();
        s.baseParams.search = '';
        Ext.getCmp('rpt-bms-tf-search').reset();
    	this.getBottomToolbar().changePage(1);
        this.refresh();
    }
    ,search: function(tf,newValue,oldValue) {
        this.getStore().baseParams.search = newValue || tf;
        this.getBottomToolbar().changePage(1);
        this.refresh();
        return true;
    }
    ,getMenu: function() {
        var m = [];
        if (m.length > 0) {
            this.addContextMenuItem(m);
        }
    }
});
Ext.reg('rpt-grid-ban-matches',Rampart.grid.BanMatches);
