jQuery(document).ready(function(a){a("#link_rel").prop("readonly",!0);a("#linkxfndiv input").bind("click keyup",function(){var b=a("#me").is(":checked"),c="";a("input.valinp").each(function(){if(b)a(this).prop("disabled",!0).parent().addClass("disabled");else{a(this).removeAttr("disabled").parent().removeClass("disabled");a(this).is(":checked")&&a(this).val()!=""&&(c+=a(this).val()+" ")}});a("#link_rel").val(b?"me":c.substr(0,c.length-1))})});