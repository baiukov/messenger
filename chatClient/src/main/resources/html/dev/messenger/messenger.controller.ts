import { App } from '../App.js'
import { Events } from '../enums/Events.enum.js'
import { MessengerService } from './messenger.service.js'

export class MessengerController {

	private messengerService: MessengerService

	constructor(messengerSerice: MessengerService) {
		
		this.messengerService = messengerSerice;

		App.on(Events.SETID, (id: string) => {
			this.messengerService.fetchData(id)
		})

		App.onClient(Events.FETCHNAME, (message: string[]) => {
			this.messengerService.setFullName(message)
		}) 

		App.onClient(Events.FETCHUSERS, (message: string[]) => {
			this.messengerService.showUsers(message)
		})

		App.onClient(Events.FETCHCOLOR, (messsage: string[]) => {
			this.messengerService.setColor(messsage)
		})

		App.onClient(Events.FETCHDIALOGUES, (message: string[]) => {
			this.messengerService.showDialogues(message)
		})

		App.onClient(Events.ERROR, (message: string[]) => {
			this.messengerService.showProfileError(message)
		})
	}

}