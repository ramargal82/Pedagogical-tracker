// Antes apuntaba a Google o a otra URL externa. Ahora apunta a tu propio servidor de Cloudflare
fetch('/guardar', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(datosDelEntrenamiento),
})
.then(response => response.json())
.then(data => console.log('¡Guardado a través del puente de Cloudflare!', data))
.catch(error => console.error('Error:', error));
