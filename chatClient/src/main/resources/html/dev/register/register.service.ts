import { App } from '../App.js'
import { Events } from '../enums/Events.enum.js'
import { log } from '../utils/log.js'

export class RegisterService {

	constructor() {
		this.startListener()
	}

	private startListener = () => {

		$("#login").submit(() => {
			const name = $("#userName").val() as string
			const password = $("#password").val() as string

			if (!name || !password) return false

			const space = " "
			if (name.includes(space) || password.includes(space)) {
				App.emit(Events.NOTIFY, "Don't use spaces")
				return false
			}

			log("User filled login form successfully, proceed to the server")
			App.emitClient(Events.LOGIN, [name, password] )
			return false;
		})

		$("#register").submit(() => {
			const name = $("#userName").val() as string
			const firstName = $("#firstName").val() as string
			const lastName = $("#lastName").val() as string
			const password = $("#password").val() as string
			const repeatPassword = $("#passwordRepeat").val()

			if (!name || !password || !firstName || !lastName || !repeatPassword) {
				App.emit(Events.NOTIFY, "You didn't fill the form properly")
				return false
			};

			const space = " "
			if (firstName.includes(space) || lastName.includes(space) || password.includes(space)) {
				App.emit(Events.NOTIFY, "Don't use spaces")
				return false
			}

			if (password != repeatPassword) {
				App.emit(Events.NOTIFY, "Passwords don't match")
				return false
			}

			if ((password as string).length < 6) {
				App.emit(Events.NOTIFY, "Password should contain at least 6 characters")
				return false
			}

			if ((name as string).length < 4) {
				App.emit(Events.NOTIFY, "User name should contain at least 4 characters")
				return false
			}

			log("User filled register form successfully, proceed to the server")
			App.emitClient(Events.REGISTER, [name, firstName, lastName, password] )
			return false
		})

	}

	public moveToMain = (message: string[]) => {
		if (message.length < 2) {
			App.emit(Events.NOTIFY, "Unknown error happened")
			return;
		} 
		App.id = message[1];
		log("User will be redirected to the main page")
		// @ts-ignore
		window.javaConnector.setID(message[1])
		// @ts-ignore
		window.javaConnector.switchPage("main", null)
	}

}