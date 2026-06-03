import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export const dynamic = 'force-dynamic';

const DB_PATH = path.join(process.cwd(), 'data', 'db.json');

function readDB() {
  try {
    const data = fs.readFileSync(DB_PATH, 'utf-8');
    const parsed = JSON.parse(data);
    if (!parsed.globalVotes) parsed.globalVotes = {};
    return parsed;
  } catch (error) {
    console.error('Error reading DB:', error);
    return { users: [], matches: [], globalVotes: {} };
  }
}

function writeDB(data: any) {
  fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
}

export async function GET() {
  const db = readDB();
  return NextResponse.json(db);
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { action, userId, matchId, pick, countryCode } = body;
    const db = readDB();

    if (action === 'global_vote') {
      if (!userId || !countryCode) {
        return NextResponse.json({ error: 'Missing fields for global vote' }, { status: 400 });
      }
      const user = db.users.find((u: any) => u.id === userId);
      if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 });
      
      db.globalVotes[userId] = countryCode;
      writeDB(db);
      return NextResponse.json(db);
    }
    
    // Normal match prediction
    if (!userId || !matchId || !pick) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }

    const user = db.users.find((u: any) => u.id === userId);
    const match = db.matches.find((m: any) => m.id === matchId);
    
    if (!user || !match) {
      return NextResponse.json({ error: 'User or Match not found' }, { status: 404 });
    }

    const previousPick = user.votes[matchId];
    if (previousPick === pick) {
      return NextResponse.json(db); // No change
    }

    // Remove old vote
    if (previousPick) {
      if (previousPick === 'home') match.homeWinVotes--;
      if (previousPick === 'draw') match.drawVotes--;
      if (previousPick === 'away') match.awayVotes--;
    } else {
      // New prediction
      user.predictions++;
      match.totalVotes++;
    }

    // Add new vote
    if (pick === 'home') match.homeWinVotes++;
    if (pick === 'draw') match.drawVotes++;
    if (pick === 'away') match.awayVotes++;

    user.votes[matchId] = pick;
    
    writeDB(db);

    return NextResponse.json(db);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
