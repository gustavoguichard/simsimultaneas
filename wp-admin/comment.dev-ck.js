jQuery(document).ready(function(a){var b=a("#timestamp").html();a(".edit-timestamp").click(function(){if(a("#timestampdiv").is(":hidden")){a("#timestampdiv").slideDown("normal");a(".edit-timestamp").hide()}return!1});a(".cancel-timestamp").click(function(){a("#timestampdiv").slideUp("normal");a("#mm").val(a("#hidden_mm").val());a("#jj").val(a("#hidden_jj").val());a("#aa").val(a("#hidden_aa").val());a("#hh").val(a("#hidden_hh").val());a("#mn").val(a("#hidden_mn").val());a("#timestamp").html(b);a(".edit-timestamp").show();return!1});a(".save-timestamp").click(function(){var b=a("#aa").val(),c=a("#mm").val(),d=a("#jj").val(),e=a("#hh").val(),f=a("#mn").val(),g=new Date(b,c-1,d,e,f);if(g.getFullYear()!=b||1+g.getMonth()!=c||g.getDate()!=d||g.getMinutes()!=f){a(".timestamp-wrap","#timestampdiv").addClass("form-invalid");return!1}a(".timestamp-wrap","#timestampdiv").removeClass("form-invalid");a("#timestampdiv").slideUp("normal");a(".edit-timestamp").show();a("#timestamp").html(commentL10n.submittedOn+" <b>"+a('#mm option[value="'+c+'"]').text()+" "+d+", "+b+" @ "+e+":"+f+"</b> ");return!1})});