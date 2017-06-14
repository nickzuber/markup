```
type scheme = {
	_id: Object(int),
	hash_id: int,
	head: ip,
	copies: _copies,
	editor_data: _editors
}

and _copies = {
	ip: _revision
}

and _revision = {
	text: str,
	date: Date()
}

and _editors = {
	ip: int (* edit count *)
}
```

---

- Hash in URL
	- Invalid Hash
		- Popup saying no results where found etc.
	- Valid hash
		- Load recent revision & compile
			- First copy or updating existing copy
				- "Update document"
				- db.head = ip
				- db.copies[ip] = {text, date}
				- db.editor_data[ip] += 1

- No has in the URL
	- "Share document"
	- Generate unique hash
	- Create new scheme
