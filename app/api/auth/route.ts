import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const DB_PATH = path.join(process.cwd(), 'data', 'db.json');

function readDB() {
  try {
    const data = fs.readFileSync(DB_PATH, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    return { users: [], matches: [], globalVotes: {} };
  }
}

function writeDB(data: any) {
  fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
}

function generateId() {
  return 'u' + Math.random().toString(36).substring(2, 9);
}

export async function POST(req: Request) {
  try {
    const { email, name } = await req.json();
    if (!email || !name) {
      return NextResponse.json({ error: 'Email and Name are required' }, { status: 400 });
    }

    const db = readDB();
    const emailLower = email.toLowerCase();
    
    let user = db.users.find((u: any) => u.email === emailLower);
    
    if (!user) {
      // Create new user
      user = {
        id: generateId(),
        email: emailLower,
        name: name,
        avatar: `https://api.dicebear.com/9.x/avataaars/svg?seed=${name}&backgroundColor=b6e3f4`,
        points: 0,
        predictions: 0,
        votes: {}
      };
      db.users.push(user);
      writeDB(db);
    }

    return NextResponse.json({ user });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
