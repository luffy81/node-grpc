# Multiple Proto & Service

#### Struktur Folder:
- **/proto**
  - `order.proto`
  - `dll.proto`
- **/routes**
  - `order.route.js`
  - `dll.route.js`
- **/services**
  - `order.service.js`
  - `dll.service.js`
- **/validations**
  - `order.validation.js`
  - `dll.validation.js`
- `client.js`
- `protos.js`
- `server.js`
- `test.js`


#### Keterangan:

> `/proto` kumpulan protobuf grpc.

> `/middleware` kumpulan function bertujuan untuk melakukan verifikasi / authentications. 

> `/routes` kumpulan perutean method grpc ke service grpc dan implementasi middleware.

> `/services` kumpulan service / logic grpc.

> `/validations` kumpulan validation request data sebelum diteruskan ke service.

> `client.js` Managemen untuk koneksi ke gRPC server.

> `protos.js` Managemen untuk Protobuf gRPC.

> `server.js` Main project gRPC Server.

> `test.js` contoh consume gRPC Server.

## Kode

Anda dapat menyematkan kode dalam teks, seperti `ini adalah kode`.

Jika Anda memiliki beberapa blok kode, gunakan tiga backtick (`) sebelum dan setelah blok kode:

```python
def contoh_kode():
    print("Ini adalah contoh kode dalam Python")