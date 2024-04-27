import { App } from '../App.js';
import { Events } from '../enums/Events.enum.js';
var MessengerController = /** @class */ (function () {
    function MessengerController(messengerSerice) {
        var _this = this;
        console.log(1);
        this.messengerService = messengerSerice;
        App.on(Events.SETID, function (id) {
            _this.messengerService.fetchData(id);
        });
        App.onClient(Events.FETCHNAME, function (message) {
            _this.messengerService.setFullName(message);
        });
        App.onClient(Events.FETCHUSERS, function (message) {
            _this.messengerService.showUsers(message);
        });
        App.onClient(Events.FETCHCOLOR, function (messsage) {
            _this.messengerService.setColor(messsage);
        });
    }
    return MessengerController;
}());
export { MessengerController };