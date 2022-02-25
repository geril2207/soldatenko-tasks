<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 leading-tight">
            {{__('Изменить задачу')}}
        </h2>
    </x-slot>

    <div class="py-12">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div class="bg-white overflow-hidden shadow-xl sm:rounded-lg">
                <form action="/task/{{$task->id}}" method="post">
                    <textarea name="description" cols="30" rows="10">{{$task->description}}</textarea>
                    @if ($errors-> has('description'))
                    <span>{{$errors->first('description')}}</span>
                    @endif
                    <div class="form-group">
                        <button class="bg-sky px-2 py-1 text-white rounded-md" type="submit">Обновить</button>
                    </div>
                    {{csrf_field()}}
                </form>
            </div>
        </div>
    </div>
</x-app-layout>