$(document).ready(function () {
	$('#telefono').mask('000-000-0000');
});
let txtNombre = document.getElementById('txtNombre');
txtNombre.focus();


//  -- FECHA ---
var fechaFormateada=new Date(this.hoy).getDate()+"-"+new Date(this.hoy).getMonth()+"-"+new Date(this.hoy).getFullYear(),
horaFormateada =new Date(this.hoy).getHours()+":"+new Date(this.hoy).getMinutes();

Vue.filter('capitalize', function (value) {
	if (!value) return ''
	value = value.toString()
	return value.charAt(0).toUpperCase() + value.slice(1)
  })
  
  new Vue({
	// ...
  })



const app = new Vue({
	el: '#app',
	data: {
		titulo: 'Agenda de Contactos',
		contactos: [],
		Nombre: '',
		Telefono: '',
		Correo: '',
		f_nacimiento: '',
		f_creacion: '',
		Direccion: '',
		seleccionado: false,
		
	},
	

	methods: {
		limpiar: function () {
			this.Nombre = '';
			this.Telefono = '';
			this.Correo = '';
			this.f_nacimiento = '';
			this.Direccion = '';
		},


		created : function(){
			this.hoy=Date.now();
			this.f_creacion=new Date(this.hoy).getDate()+"-"+new Date(this.hoy).getMonth()+"-"+new Date(this.hoy).getFullYear();
		  },
		// -- AGREGAR --
		agregarContacto: function () {
			//Validaciones
			if (
				this.Nombre === '' ||
				this.Telefono === '' ||
				this.Correo === '' ||
				this.f_nacimiento === '' ||
				this.Direccion === ''
			) {
				alert('¡Todos los campos son requeridos!');
			} else {
				this.contactos.push({
					nombre: this.Nombre,
					telefono: this.Telefono,
					correo: this.Correo,
					nacimiento: this.f_nacimiento,
					direccion: this.Direccion,
				});

				this.limpiar();
				localStorage.setItem('agenda-pro', JSON.stringify(this.contactos));
				let txtNombre = document.getElementById('txtNombre');
				txtNombre.focus();
			}
		},





		// -- MOSTRAR --
		mostrarContacto: function (index) {
			if (this.Nombre === '') {
				document.getElementById('boton-submit').disabled = true;
				this.contactos[index].seleccionado = true;
				this.Nombre = this.contactos[index].nombre;
				this.Telefono = this.contactos[index].telefono;
				this.Correo = this.contactos[index].correo;
				this.f_nacimiento= this.contactos[index].f_nacimiento;
				this.Direccion= this.contactos[index].direccion;
			} else {
				this.editarContacto(index);
				this.contactos[index].seleccionado = false;
				document.getElementById('boton-submit').disabled = false;
			}
		},
		// -- EDITAR --
		editarContacto: function (index) {
			this.contactos[index].nombre = this.Nombre;
			this.contactos[index].telefono = this.Telefono;
			this.contactos[index].correo = this.Correo;
			this.contactos[index].f_nacimiento = this.f_nacimiento;
			this.Direccion[index].direccion = this.Direccion;
			this.btnEdicion = 'Editar';
			this.limpiar();

			localStorage.setItem('agenda-pro', JSON.stringify(this.contactos));
		},
		// -- ELIMINAR --
		eliminar: function (index) {
			this.contactos.splice(index, 1);
			localStorage.setItem('agenda-pro', JSON.stringify(this.contactos));
		},
	},
	// -- GUARDAR EN LOCAL --
	created: function () {
		let datosDB = JSON.parse(localStorage.getItem('agenda-pro'));
		console.log(datosDB);

		if (datosDB === null) {
			this.contactos = [];
		} else {
			this.contactos = datosDB;
		}
	},
});
