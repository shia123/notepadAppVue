<?php

namespace App\Http\Controllers;

use App\Models\Notes;
use App\Models\Users;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class NotesController extends Controller
{
    //
    public function saveNotes(Request $request)
    {

        if ($request->input('file_id')) {

            $checkFileName = Notes::where('id', $request->input('file_id'))
                ->first();
            if ($checkFileName) {
                $checkFileName->update(
                    [
                        'note_details' => $request->input('note_details')
                    ]
                );
                return response()->json(['message' => 'Note Updated']);
            } else {
                return response()->json(['message' => 'File not exist'], 400);
            }
        } else {

            $request->validate([
                'file_name' => 'required',
            ]);
            $noteData = $request->except('file_id');
            $checkFileName = Notes::where('file_name', $request->input('file_name'))
                ->first();
            if ($checkFileName) {

                return response()->json(['message' => 'File already exist, use different filename'], 400);
            }

            Notes::create($noteData);
            return response()->json(['message' => 'Note Saved']);
        }
    }



    public function getNotes()
    {
        $notes = Notes::get();

        return response()->json($notes);
    }
}
