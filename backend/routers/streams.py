from fastapi import APIRouter, WebSocket, WebSocketDisconnect
from backend import broadcast

router = APIRouter()


@router.websocket("/ws/aqi")
async def aqi_ws(ws: WebSocket):
    await ws.accept()
    await broadcast.register(ws)
    try:
        while True:
            # keep connection open; clients may send ping messages
            msg = await ws.receive_text()
            # echo or ignore
            await ws.send_text(f"ack: {msg}")
    except WebSocketDisconnect:
        await broadcast.unregister(ws)
    except Exception:
        await broadcast.unregister(ws)
