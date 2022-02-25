<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 leading-tight">
            {{ __('Список задач') }}
        </h2>
    </x-slot>


    <div class="py-12">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div class="bg-white overflow-hidden shadow-xl sm:rounded-lg">
                <div class="text-center">
                    <div>Список задач</div>
                    <a class="bg-sky px-2 py-1 text-white rounded-md text-center" href="/task">Добавить задачу</a>
                </div>
                <table class="w-full">
                    <thead>
                        <tr>
                            <th>Задачи</th>
                            <th>Действия</th>
                        </tr>
                    </thead>
                    <tbody>
                        @foreach(auth()->user()->tasks as $task)
                        <tr class="text-center">
                            <td>{{$task->description}}</td>
                            <td>
                                <div class="flex justify-center items-center">
                                    <a class="bg-sky px-2 py-1 text-white rounded-md" href="/task/{{$task->id}}">Изменить</a>
                                    <form action="/task/{{$task->id}}" method="POST">
                                        <button class="bg-reddel px-2 py-1 text-white rounded-md" type="submit" name="delete">Удалить</button>
                                        {{csrf_field()}}
                                    </form>
                                </div>
                            </td>
                        </tr>
                        @endforeach
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</x-app-layout>