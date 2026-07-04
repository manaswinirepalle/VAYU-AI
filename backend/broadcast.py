import asyncio
from typing import Set

connections: Set[object] = set()
queue: asyncio.Queue = asyncio.Queue()


async def register(ws):
    connections.add(ws)


async def unregister(ws):
    connections.discard(ws)


async def broadcaster():
    """Consume messages from queue and send to all connected websockets."""
    while True:
        msg = await queue.get()
        to_remove = []
        for ws in list(connections):
            try:
                await ws.send_json(msg)
            except Exception:
                to_remove.append(ws)
        for ws in to_remove:
            connections.discard(ws)
