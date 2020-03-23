```curl
curl -X POST -v http://localhost:3000/game
```

> fail
```curl
curl -X PUT -v -d '{"first": 0, "second": 0}' -H "Content-Type:application/json" http://localhost:3000/scores
```

> open
```curl
curl -X PUT -v -d '{"first": 3, "second": 4}' -H "Content-Type:application/json" http://localhost:3000/scores
```

> spake
```curl
curl -X PUT -v -d '{"first": 6, "second": 4}' -H "Content-Type:application/json" http://localhost:3000/scores
```

> strike
```curl
curl -X PUT -v -d '{"first": 10, "second": 0}' -H "Content-Type:application/json" http://localhost:3000/scores
```

> strike + bonus
```curl
curl -X PUT -v -d '{"first": 10, "second": 0, "third": 7}' -H "Content-Type:application/json" http://localhost:3000/scores
```

```curl
curl -X GET -v http://localhost:3000/scores
```

> error strike + bonus
```curl
curl -X PUT -v -d '{"first": 0, "second": -1, "third": "asdasd"}' -H "Content-Type:application/json" http://localhost:3000/scores
```