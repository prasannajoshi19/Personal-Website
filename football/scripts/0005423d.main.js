!function(){Ember.Handlebars.registerBoundHelper("createPages",function(a,b){var c,d=Number(a),e="";for(d&&(e+='<div class="page_box prev_page"></div>'),c=1;d>=c;c+=1)e=b===c?e+'<div class="page_box selected_box">'+c+"</div>":e+'<div class="page_box">'+c+"</div>";return d&&(e+='<div class="page_box next_page"></div>'),new Ember.Handlebars.SafeString(e)}),Ember.Handlebars.registerBoundHelper("playerForm",function(a){var b,c=a.form,d="";for(b=1;10>=b;b+=1)d+=c>=b?'<div class="form_box filled_box"></div>':'<div class="form_box"></div>';return new Ember.Handlebars.SafeString(d)});var a=window.Club=Ember.Application.create();a.setProperties({defaultCountry:"All Countries",defaultPosition:"All Positions"})}(),function(){Club.IndexController=Ember.Controller.extend({highValue:40,lowValue:20,selectedPage:1,pageSize:4,filterData:function(a,b,c){var d,e=[],f=b.length;if(f)for(d=0;f>d;d+=1)e=e.concat(a.filterBy(c,b[d]));return e},setPageNumber:function(){var a,b=this.get("selectedData"),c=this.get("pageSize"),d=b.length;a=d%c?Math.floor(d/c)+1:Math.floor(d/c),this.setProperties({noOfPages:a,selectedPage:1}),this.setSelectedPageData()}.observes("selectedData"),setSelectedData:function(){var a,b,c,d,e=this.get("data"),f=e,g=[];for(f=this.filterData(f,this.get("countryValue"),"nationality"),f=this.filterData(f,this.get("positionValue"),"position"),d=f.length,a=0;d>a;a+=1)b=f[a],c=b.age,c>=this.get("lowValue")&&c<=this.get("highValue")&&g.push(b);f=g,this.set("selectedData",f)}.observes("countryValue","positionValue","lowValue","highValue"),setSelectedPageData:function(){var a=this.get("selectedData"),b=a.length,c=this.get("pageSize"),d=c*(this.get("selectedPage")-1),e=Math.min(b,d+c),f=[];for(i=d;i<e;i+=1)f.push(a[i]);this.setProperties({startIndex:Math.min(d+1,e),endIndex:e,selectedDataLength:b,selectedPageData:f})}.observes("selectedPage")})}(),function(){Club.ApplicationAdapter=DS.FixtureAdapter}(),function(){Club.IndexRoute=Ember.Route.extend({model:function(){return new Ember.RSVP.Promise(function(a){Ember.$.getJSON("json/data.json").then(function(b){a(b.data)})})},setupController:function(a,b){if("undefined"!=typeof b){var c,d,e,f,g,h,i=b.length,j=[],k=[],l=[],m=[];for(c=0;i>c;c+=1)d=b[c],e=d.nationality,f=d.position,g={text:e},h={text:f},j.filterBy("text",e).length||(l.push(e),j.push(g)),k.filterBy("text",f).length||(m.push(f),k.push(h))}else alert("error in data");a.setProperties({data:b,selectedData:b,countryList:j,positionList:k,countryValue:l,positionValue:m})}})}(),function(){Club.IndexView=Ember.View.extend({templateName:"index",classNames:["container"],didInsertElement:function(){if(this.$()&&"preRender"!==this.state&&"destroyed"!==this.state){var a=this.get("controller").getProperties("countryList","positionList");this.initializeDropDown(".country_list",a.countryList,Club.get("defaultCountry")),this.initializeDropDown(".position_list",a.positionList,Club.get("defaultPosition")),this.initializeSlider(".age_slider",20,40),this.resizeHandler()}},click:function(a){var b=$(a.target),c=this.get("controller"),d=c.get("selectedPage"),e=this.get("controller.noOfPages");b.hasClass("page_box")&&(b.hasClass("prev_page")?d>1&&(d-=1):b.hasClass("next_page")?e>d&&(d+=1):d=Number(b.text()),c.set("selectedPage",d))},willDestroyElement:function(){},dropdownSelect:function(a){var b=this.get("controller"),c=this.$(a).eq(0),d=c.multipleSelect("getSelects");c.hasClass("country_list")?b.set("countryValue",d):c.hasClass("position_list")&&b.set("positionValue",d)},initializeDropDown:function(a,b,c){this.$(a).multipleSelect({selectAll:!0,selectAllText:c,width:170,height:40,onClick:$.proxy(this.dropdownSelect,this,a),onCheckAll:$.proxy(this.dropdownSelect,this,a),onUncheckAll:$.proxy(this.dropdownSelect,this,a)})},initializeSlider:function(a){var b=this.get("controller").getProperties("lowValue","highValue"),c=b.lowValue,d=b.highValue;this.$(a).slider({range:!0,min:c,max:d,values:[c,d],slide:$.proxy(this.onSlide,this)})},onSlide:function(a,b){var c=b.values,d=c[0],e=c[1];this.get("controller").setProperties({lowValue:d,highValue:e})},resizeHandler:function(){var a=this.$(".content").height(),b=this.$(".info_box").height(),c=Math.floor(a/(b+15)),d=this.get("controller");d.get("pageSize")!==c&&(d.set("pageSize",c),d.setPageNumber())}})}(),function(){Club.InfoView=Ember.View.extend({templateName:"info",classNames:["info_box","box"]})}(),function(){Club.Router.map(function(){})}();