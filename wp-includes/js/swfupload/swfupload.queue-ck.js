/*
	Queue Plug-in
	
	Features:
		*Adds a cancelQueue() method for cancelling the entire queue.
		*All queued files are uploaded when startUpload() is called.
		*If false is returned from uploadComplete then the queue upload is stopped.
		 If false is not returned (strict comparison) then the queue upload is continued.
		*Adds a QueueComplete event that is fired when all the queued files have finished uploading.
		 Set the event handler with the queue_complete_handler setting.
		
	*/var SWFUpload;if(typeof SWFUpload=="function"){SWFUpload.queue={};SWFUpload.prototype.initSettings=function(a){return function(){typeof a=="function"&&a.call(this);this.queueSettings={};this.queueSettings.queue_cancelled_flag=!1;this.queueSettings.queue_upload_count=0;this.queueSettings.user_upload_complete_handler=this.settings.upload_complete_handler;this.queueSettings.user_upload_start_handler=this.settings.upload_start_handler;this.settings.upload_complete_handler=SWFUpload.queue.uploadCompleteHandler;this.settings.upload_start_handler=SWFUpload.queue.uploadStartHandler;this.settings.queue_complete_handler=this.settings.queue_complete_handler||null}}(SWFUpload.prototype.initSettings);SWFUpload.prototype.startUpload=function(a){this.queueSettings.queue_cancelled_flag=!1;this.callFlash("StartUpload",[a])};SWFUpload.prototype.cancelQueue=function(){this.queueSettings.queue_cancelled_flag=!0;this.stopUpload();var a=this.getStats();while(a.files_queued>0){this.cancelUpload();a=this.getStats()}};SWFUpload.queue.uploadStartHandler=function(a){var b;typeof this.queueSettings.user_upload_start_handler=="function"&&(b=this.queueSettings.user_upload_start_handler.call(this,a));b=b===!1?!1:!0;this.queueSettings.queue_cancelled_flag=!b;return b};SWFUpload.queue.uploadCompleteHandler=function(a){var b=this.queueSettings.user_upload_complete_handler,c;a.filestatus===SWFUpload.FILE_STATUS.COMPLETE&&this.queueSettings.queue_upload_count++;typeof b=="function"?c=b.call(this,a)===!1?!1:!0:a.filestatus===SWFUpload.FILE_STATUS.QUEUED?c=!1:c=!0;if(c){var d=this.getStats();if(d.files_queued>0&&this.queueSettings.queue_cancelled_flag===!1)this.startUpload();else if(this.queueSettings.queue_cancelled_flag===!1){this.queueEvent("queue_complete_handler",[this.queueSettings.queue_upload_count]);this.queueSettings.queue_upload_count=0}else{this.queueSettings.queue_cancelled_flag=!1;this.queueSettings.queue_upload_count=0}}}};